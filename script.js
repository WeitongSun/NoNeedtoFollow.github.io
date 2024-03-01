document.addEventListener('DOMContentLoaded', function() {
    const timelineData = [
        { img: 'imgs/Musong.png', text: '“I have gradually come to understand what being a parent means: it means that the rest of your life is merely following your children with your eyes, slowly watching them move further and further away. So you are standing on the end of the path, as their silhouette is dribbling away in the corner of the road and their shadow silently tells you: ‘No need to follow’.” This is a paragraph from Musong by Lung Yingtai.' },
        { img: 'image2.jpg', text: 'Event 2 Description' },
        { img: 'image3.jpg', text: 'Event 3 Description' },
        { img: 'image4.jpg', text: 'Event 4 Description' },
        { img: 'image5.jpg', text: 'Event 5 Description' }
    ];

    const slider = document.getElementById('timelineSlider');
    const imageDisplay = document.getElementById('imageDisplay');
    const textDisplay = document.getElementById('textDisplay');

    slider.addEventListener('input', updateContent);

    function updateBackgroundColor(imageElement) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        let img = new Image();
        img.crossOrigin = "Anonymous"; // Use this if images are served from a different domain
        img.src = imageElement.src;

        img.onload = function() {
            canvas.width = this.width;
            canvas.height = this.height;
            context.drawImage(this, 0, 0, this.width, this.height);

            let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            let colorMap = {};
            let maxCount = 0, dominantColor = '';

            for (let i = 0; i < imageData.data.length; i += 4) {
                let color = `${imageData.data[i]},${imageData.data[i + 1]},${imageData.data[i + 2]}`;
                colorMap[color] = (colorMap[color] || 0) + 1;

                if (colorMap[color] > maxCount) {
                    maxCount = colorMap[color];
                    dominantColor = color;
                }
            }

            document.body.style.backgroundColor = `rgb(${dominantColor})`;
        };
    }

    function typeWriterEffect(element, text, typingSpeed, imageElement) {
        let i = 0;
        element.innerHTML = ""; // Clear existing content
    
        // Initial sizes
        let initialFontSize = 24; // Starting font size in pixels
        let finalFontSize = 34; // Final font size in pixels
        let initialImageWidth = 80; // Starting image width percentage
        let finalImageWidth = 40; // Final image width percentage
    
        // Calculate increments
        let fontSizeIncrement = (finalFontSize - initialFontSize) / text.length;
        let imageWidthDecrement = (initialImageWidth - finalImageWidth) / text.length;
    
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                element.style.fontSize = `${initialFontSize + fontSizeIncrement * i}px`;
                imageElement.style.width = `${initialImageWidth - imageWidthDecrement * i}%`;
    
                i++;
                setTimeout(typing, typingSpeed);
            }
        }
        typing();
    }



    function updateContent() {
        const value = parseInt(slider.value, 10);
        const data = timelineData[value];
        imageDisplay.src = data.img;
        // textDisplay.textContent = data.text;

       // Pass the image element along with the text element to the typewriter effect function
       typeWriterEffect(textDisplay, data.text, 50, imageDisplay); // Adjust the typing speed as desired

        // Update the background color to match the new image
        updateBackgroundColor(imageDisplay);
    }

    slider.addEventListener('input', updateContent);

    // Initialize
    updateContent();
});
