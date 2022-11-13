const wrapper = document.querySelector(".wrapper"),
qrInput = wrapper.querySelector('.form input'),
generateBtn = wrapper.querySelector('.form button'),
downloadBtn = document.querySelector("#download"),
qrImg = wrapper.querySelector('.qr-code img');
let preValue, qrCode;

generateBtn.addEventListener('click', () => {
    let qrValue = qrInput.value.trim();
    if(!qrValue || preValue === qrValue) return;
    preValue = qrValue;
    generateBtn.innerText = "Generating QR Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
    });
});

qrInput.addEventListener("keyup", () => {
    if(!qrInput.value.trim()) {
        wrapper.classList.remove("active");
        preValue = "";
    }
}) 

downloadBtn.addEventListener("click", e => {
    e.preventDefault();
    const image = document.querySelector(".qr-code").getElementsByTagName("img");

    // Get the src attribute of the image, which is the data-encoded QR code
    const qr = image[0].src;
    setUpDownload(qr)
});
function setUpDownload(imageLink) {
    fetch(imageLink).then(res => res.blob().then(file => {
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href = tempUrl;
        aTag.download = "filename";
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
        /* alert(tempUrl); */
    }))
}

