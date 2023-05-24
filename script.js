let numImages = 1;

let btn = document.getElementById('btn');
const topText = document.getElementById('topText');
const bottomText = document.getElementById('bottomText');
const imageURL = document.getElementById('imageURL');
let canvas = document.createElement('canvas')
let context = canvas.getContext('2d');

function createImgDiv() {
    let title = 'img_' + numImages.toString();
    let newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'image-div ' + title);
    newDiv.style.width = '100%'; 
    newDiv.style.height = 'auto'; 
    numImages++;
    return newDiv;
  }
  
function loadImage(canvas) {
  const img = new Image();
  img.src = imageURL.value;
  img.crossOrigin = 'Anonymous';
  img.onload = function() {
    let nw = img.naturalWidth;
    let nh = img.naturalHeight;
    canvas.width = nw / 2;
    canvas.height = nh / 2;
    let aspect = nw / nh;
    let h = canvas.width / aspect;

    const context = canvas.getContext('2d');
    context.drawImage(img, 0, 0, canvas.width, canvas.height);

    createAllText(context);
    createTopTextAlignment(context);
    createTopTextFillandStroke(context);
    createBottomTextAlignment(context);
    createBottomTextFillandStroke(context);

    resetInputFields();
  };
}

function createAllText(context) {
  context.font = '50px Impact';
  context.fillStyle = 'white';
  context.strokeStyle = 'black';
  context.lineWidth = 2;
}

function createTopTextAlignment(context) {
  context.textAlign = 'center';
  context.textBaseline = 'top';
}

function createTopTextFillandStroke(context) {
  let textX = canvas.width / 2;
  let textY = 20;
  context.fillText(topText.value, textX, textY);
  context.strokeText(topText.value, textX, textY);
}

function createBottomTextAlignment(context) {
  context.textAlign = 'center';
  context.textBaseline = 'bottom';
}

function createBottomTextFillandStroke(context) {
  let textX = canvas.width / 2;
  let textY = canvas.height - 30;
  context.fillText(bottomText.value, textX, textY);
  context.strokeText(bottomText.value, textX, textY);
}

function resetInputFields() {
  topText.value = '';
  bottomText.value = '';
  imageURL.value = '';
}

function removeImg() {
  imageURL.value.remove();
}

function divBuilder() {
  if (!topText.value || !bottomText.value || !imageURL.value) {
    return;
  }

  let imgDiv = createImgDiv();
  let imageContainer = document.createElement('div');
  imageContainer.classList.add('image-container');
  imageContainer.appendChild(imgDiv);

  let displayedImages = document.getElementById('displayed_images');
  displayedImages.appendChild(imageContainer);

  imgDiv.appendChild(canvas);
  loadImage(canvas);

}

btn.addEventListener('click', function(e) {
  e.preventDefault();
  if (!topText.value || !bottomText.value || !imageURL.value) {
    alert('Please fill in all fields.');
    return;
  }
  divBuilder();
});
