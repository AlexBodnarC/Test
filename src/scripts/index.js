"use strict";
const buttonRemove = document.getElementById("button_remove");
const buttonGenerate = document.getElementById("button_generate");
const buttonGenerateForSelected = document.getElementById(
  "button_generate_for_selected"
);
const allImgTag = Array.prototype.slice.call(
  document.getElementsByTagName("img")
);
let selectedImg = [];

allImgTag.forEach((img) => {
  img.addEventListener("click", () => {
    !selectedImg.includes(img)
      ? selectedImg.push(img)
      : removeElementFromArray(img);
    img.classList.toggle("selected_img");
  });
});

buttonRemove.addEventListener("click", () => {
  removeAllAltAttrubitesImg();
});
buttonGenerate.addEventListener("click", () => {
  generateAllAltAttrubitesImg();
});
buttonGenerateForSelected.addEventListener("click", () => {
  generateSelectedImgAltAttrubites();
});

function removeClassImg() {
  allImgTag.forEach((img) => {
    img.classList.remove("changeAlt");
    img.classList.remove("selected_img");
  });
}

function removeElementFromArray(element) {
  const index = selectedImg.indexOf(element);

  if (index > -1) {
    selectedImg.splice(index, 1);
  }
}

async function getRandomWords(numberOfWords) {
  try {
    const response = await fetch(
      `https://random-word-api.herokuapp.com/word?number=${numberOfWords}`
    );
    const randomWords = await response.json();

    return randomWords;
  } catch (error) {
    console.error(error);
  }
}

async function generateAllAltAttrubitesImg() {
  const randomWords = await getRandomWords(allImgTag.length);
  removeClassImg();

  allImgTag.forEach((img, i) => {
    img.alt = randomWords[i];
    img.classList.add("changeAlt");
  });
}

function removeAllAltAttrubitesImg() {
  removeClassImg();

  allImgTag.forEach((img) => {
    img.removeAttribute("alt");
  });
}

async function generateNoExistingAltAttrubitesImg() {
  const randomWords = await getRandomWords(allImgTag.length);
  removeClassImg();

  allImgTag
    .filter((img) => !img.alt)
    .forEach((img, i) => {
      img.alt = randomWords[i];
      img.classList.add("changeAlt");
    });
}

async function generateSelectedImgAltAttrubites() {
  const randomWords = await getRandomWords(selectedImg.length);
  removeClassImg();

  selectedImg.forEach((img, i) => {
    img.alt = randomWords[i];
    img.classList.add("changeAlt");
  });

  selectedImg = [];
}

generateNoExistingAltAttrubitesImg();
