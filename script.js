document.addEventListener('DOMContentLoaded', function() {
    const timelineData = [
        { img: "imgs/Musong.png", text: ["“I have gradually come to understand what being a parent means: it means that the rest of your life is merely following your children with your eyes, slowly watching them move further and further away. So you are standing on the end of the path, as their silhouette is dribbling away in the corner of the road and their shadow silently tells you: \‘No need to follow\’.” This is a paragraph from Musong by Lung Yingtai.","    "]},

        { img: "imgs/back.jpeg", 
        text: ["I first encountered that paragraph in fifth grade as part of an assignment. The task was to read the first chapter of Lung Yingtai’s Musong, choose three paragraphs I liked, and share them with the class. It was given to us by our new Chinese teacher, a woman in her fifties with black dry hair mixed with white strands.", "\"Why is there 'no need to follow?'\" I asked her.", "If it were me, I would definitely chase, I thought"]},

        { img: '', 
        text: ["It was early September, the lingering heat of summer was still scorching, and two wall-mounted air conditioners couldn't pacify the restlessness of 10-year-old me. I rolled up the pants of my school uniform to my thighs, sat in the back row, and observed this reserved Chinese teacher. Her presence was calm, but her gaze seemed to pierce through me. Then her eyes landed on floating dust particles, illuminated by the Tyndall effect, and suddenly her eyes were engulfed in a fire that had not yet arrived.",
        "\"Because, this is a book about time,\" she said.",
        "Twelve years old, first year of junior high. At that time, I was still chasing. Zhong Xuan wrote in my birthday card, \"Let's be best friends for a lifetime,\" then she transferred to Canada. I swore that one day I would go find her. That year, reunion was the subject of my heart, but what I learned was separation.",
        "I have gradually come to understand what being a friend means: it means that the rest of your life is merely following your friend with your eyes, slowly watching them move further and further away. So you are standing at the end of the airport security checkpoint, as their silhouette is dribbling away behind the security gate and their shadow silently tells you:", "\‘No need to follow.\’" ] },
        { img: 'image4.jpg', text: 'Event 4 Description' },
        { img: 'image5.jpg', text: 'Event 5 Description' }
    ];


    const slider = document.getElementById('timelineSlider');
    const imageDisplay = document.getElementById('imageDisplay');
    const textDisplay = document.getElementById('textDisplay');

    function typeWriterEffect(element, texts, typingSpeed, imageElement) {
        let currentParagraph = 0;
        element.innerHTML = ''; // Clear existing content

        const initialFontSize = 14; // Initial font size in pixels
        const maxFontSize = 24; // Maximum font size in pixels
        const fontSizeIncrement = (maxFontSize - initialFontSize) / texts.join('').length; // Increment based on total text length

        const initialImageWidth = 100; // Image width as percentage
        const minImageWidth = 60; // Minimum image width as percentage
        const imageWidthDecrement = (initialImageWidth - minImageWidth) / texts.join('').length; // Decrement based on total text length

        function typingParagraph(paragraphIndex) {
            if (paragraphIndex < texts.length) {
                let paragraph = texts[paragraphIndex];
                let i = 0;
                let cursorHtml = '<span class="cursor">|</span>';
                element.innerHTML += '<p>' + cursorHtml + '</p>';
                let currentElement = element.querySelectorAll('p')[paragraphIndex];
                let textLengthCounter = 0; // Counter to track overall text length across paragraphs

                function typing() {
                    if (i < paragraph.length) {
                        currentElement.innerHTML = currentElement.innerHTML.substring(0, currentElement.innerHTML.length - cursorHtml.length) + paragraph.charAt(i) + cursorHtml;
                        i++;
                        textLengthCounter++;

                        // Update font size and image width
                        let currentFontSize = initialFontSize + fontSizeIncrement * textLengthCounter;
                        let currentImageWidth = initialImageWidth - imageWidthDecrement * textLengthCounter;
                        currentElement.style.fontSize = `${currentFontSize}px`;
                        imageElement.style.width = `${currentImageWidth}%`;

                        setTimeout(typing, typingSpeed);
                    } else if (paragraphIndex < texts.length - 1) {
                        setTimeout(() => typingParagraph(paragraphIndex + 1), 500); // Add a pause before starting next paragraph
                    }
                }
                typing();
            }
        }

        typingParagraph(currentParagraph);
    }

    function updateContent() {
        const value = parseInt(slider.value, 10);
        const data = timelineData[value];

        // Check if there's an image to display
        if (data.img) {
            imageDisplay.src = data.img;
            imageDisplay.style.display = 'block'; // Ensure the image is visible
        } else {
            imageDisplay.style.display = 'none'; // Hide the image display if no image is specified
        }

        imageDisplay.src = data.img;
        textDisplay.textContent = data.text; // Update the description
        typeWriterEffect(textDisplay, data.text, 75, imageDisplay); // Pass the image element for dynamic resizing
    }

    slider.addEventListener('input', updateContent);

    // Initialize with the first data entry
    updateContent();
});

    /*** 

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
        element.innerHTML = '<span class="cursor"></span>'; // Initialize with cursor
    
        // Cursor styles
        const cursorHtml = '<span class="cursor">|</span>';
        element.innerHTML += cursorHtml; // Add cursor to the element
    
        // Calculate font size and image width adjustments
        let initialFontSize = 14; // Starting font size in pixels
        let finalFontSize = 24; // Final font size in pixels
        let initialImageWidth = 70; // Starting image width percentage
        let finalImageWidth = 45; // Final image width percentage
        let fontSizeIncrement = (finalFontSize - initialFontSize) / text.length;
        let imageWidthDecrement = (initialImageWidth - finalImageWidth) / text.length;
    
        function typing() {
            if (i < text.length) {
                element.innerHTML = element.innerHTML.substring(0, element.innerHTML.length - cursorHtml.length); // Remove cursor temporarily
                element.innerHTML += text.charAt(i) + cursorHtml; // Add next character and cursor
                element.style.fontSize = `${initialFontSize + fontSizeIncrement * i}px`;
                imageElement.style.width = `${initialImageWidth - imageWidthDecrement * i}%`;
                i++;
                setTimeout(typing, typingSpeed);
            }
        }
        typing();
    }


    



    function updateContent() {
        // textDisplay.textContent = data.text;

        const value = parseInt(slider.value, 10);
        const data = timelineData[value];
        imageDisplay.src = data.img;

        // Ensure this matches your setup; for example, by ID or class
        const textDisplayElement = document.getElementById('textDisplay'); 
        typeWriterEffect(textDisplayElement, data.text, 75, imageDisplay); // Adjust the typing speed as desired

        // Update the background color to match the new image
        //updateBackgroundColor(imageDisplay);
    }

    slider.addEventListener('input', updateContent);

    // Initialize
    updateContent();
});

*/
