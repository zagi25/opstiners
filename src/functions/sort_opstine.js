
const sort_opstine = ( array ) => {
  const azbuka = ["А", "Б", "В", "Г", "Д", "Ђ", "Е", "Ж", "З", "И", "Ј", "К", "Л", "Љ", "М", "Н", "Њ", "О", "П", "Р", "С", "Т", "Ћ", "У", "Ф", "Х", "Ц", "Ч", "Џ", "Ш"];

  array.sort();
  let asa = array.splice(0,5);
  let to_inject = [['Јагодина град'], ['Љиг', 'Љубовија'], ['Ћићевац', 'Ћуприја']];
  const after_letters = ["И", "Л", "Т"];
  
  let start = false; 
  array.forEach((word, index) => {
    if(!start){
      if(word[0] === after_letters[0]){
        start = true;
      }
    }else{
      if(word[0] !== after_letters[0]){
        to_inject[0].forEach((inj, i) => {
          array.splice(index + i, 0, inj);
        });
        to_inject.splice(0, 1);
        after_letters.splice(0, 1);
        start = false;
      }
    }
  });

  return array;
}


export default sort_opstine;
