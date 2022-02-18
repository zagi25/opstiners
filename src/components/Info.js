import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Info = ({ ime_opstine, clicked }) => {
  const [opstina, setOpstina] = useState({
    ime: '',
    okrug: '',
    povrsina: '',
    suma: '',
    broj_stanovnika: '',
    broj_naselja: '',
    prosecna_starost: '',
    putnicki_automobili: '',
    duzina_puteva: '',
  });
  const [loading, setLoading] = useState(false);
  const [goBig, setGoBig] = useState(false);


  useEffect(() => {
    const get_data = async() => {
      setLoading(true);
      const response = await fetch(`https://opstine-api.herokuapp.com/get_data?opstina=${ime_opstine}&podaci=povrsina,teritorija_pod_sumom,broj_stanovnika,broj_naselja,prosecna_starost_stanovnistva,putnicki_automobili,duzina_puteva&pismo=cyr`);
      const data = await response.json()
      if(data.status === 'Success'){
        let podaci = data.result[0].godina['2020'];
        setOpstina({
          ime: data.result[0].naziv_opstine,
          okrug: data.result[0].naziv_okruga,
          povrsina: podaci.povrsina,
          suma: podaci.teritorija_pod_sumom,
          broj_stanovnika: podaci.broj_stanovnika,
          broj_naselja: podaci.broj_naselja,
          prosecna_starost: podaci.prosecna_starost_stanovnistva,
          putnicki_automobili: podaci.putnicki_automobili,
          duzina_puteva: podaci.duzina_puteva,
        });
        setLoading(false);
      }
    }

    if(ime_opstine){
      get_data();
      ime_opstine === 'Kosovo' ? setGoBig(false) : setGoBig(true);
    }
  },[ime_opstine]);


  useEffect(() => {
    if(clicked){
      ime_opstine !== 'Kosovo' ? setGoBig(true) : setGoBig(false);
    }else{
      setOpstina({});
      setGoBig(false);
    }
  },[clicked]);

  const variants = {
    get_big: { height: '70vh' },
    get_small: { height: '20vh' },
  };


  return(
    <motion.div 
      className = 'info'
      variants = {variants} 
      animate = { goBig ? 'get_big' : 'get_small' }
      transition = {{ duration: 0.2 }}
    >
      {clicked ? 
          ime_opstine === 'Kosovo' ? 
            <div>
              <h1>Kосово је Србија!</h1>
            </div>
            :
            !loading ? 
              <motion.div 
                className = 'table-container'
                initial = {{ height: '0vh', opacity: 0 }}
                animate = {{ height: '60vh', opacity: 1 }}
                transition = {{ delay: 0.05 }}
              >
                <motion.h1
                  initial = {{ opacity: 0 }}
                  animate = {{ opacity: 1 }}
                  transition = {{ delay: 0.2 }} 
                >{opstina.ime}</motion.h1>
                <motion.table
                  initial = {{ opacity: 0 }}
                  animate = {{ opacity: 1 }}
                  exit = {{ opacity: 0 }}
                  transition = {{ delay: 0.2 }}
                >
                  <tbody>
                    <tr>
                      <th>Округ</th>
                      <td>{opstina.okrug}</td>
                    </tr>
                    <tr>
                      <th>Површина</th>
                      <td>{opstina.povrsina}</td>
                    </tr>
                    <tr>
                      <th>Територија под шумом</th>
                      <td>{opstina.suma}</td>
                    </tr>
                    <tr>
                      <th>Број становника</th>
                      <td>{opstina.broj_stanovnika}</td>
                    </tr>
                    <tr>
                      <th>Број насеља</th>
                      <td>{opstina.broj_naselja}</td>
                    </tr>
                    <tr>
                      <th>Просечна старост становника</th>
                      <td>{opstina.prosecna_starost}</td>
                    </tr>
                    <tr>
                      <th>Путнички аутомобили</th>
                      <td>{opstina.putnicki_automobili}</td>
                    </tr>
                    <tr>
                      <th>Дужина путева</th>
                      <td>{opstina.duzina_puteva}</td>
                    </tr>
                  </tbody>
                </motion.table>
              </motion.div>
              :
              <div className = 'loading-container'> 
                <img src = 'loading.png' alt = '' />
              </div>
        :
        <div>
          <h1>Кликните на општину!</h1>
        </div>
      }
    </motion.div>
  );
}

export default Info;
