import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseIcon from "@mui/icons-material/Pause";
import image1 from "./images/image-1.jpg";
import image2 from "./images/image-2.jpg";
import image3 from "./images/image-3.jpg";
import image4 from "./images/image-4.jpg";
import image5 from "./images/image-5.jpg";

function App() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [index, setIndex] = useState<number>(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    const images: string[] = [image1, image2, image3, image4, image5];
    const descs: string[] = [
        "The Maldives, a tropical paradise nestled in the heart of the Indian Ocean, is a mesmerizing archipelago composed of more than 1,000 coral islands. Renowned for its pristine natural beauty, the Maldives attracts visitors from around the globe seeking an idyllic retreat.One of the main draws of the Maldives is its breathtaking beaches. Picture powdery soft, white sands stretching as far as the eye can see, lapped by the gentle waves of the azure-colored sea. The beaches offer a tranquil haven for relaxation, sunbathing, and romantic strolls",
        "The crystal-clear turquoise waters that surround the islands are a haven for water enthusiasts. The Maldives boasts some of the world's most vibrant coral reefs, teeming with an abundance of marine life. Snorkeling and diving are popular activities, allowing visitors to explore the kaleidoscopic underwater world filled with colorful coral formations, tropical fish, rays, and even the occasional sighting of majestic sea turtles and gentle whale sharks.",
        "For those seeking an unforgettable stay, the Maldives offers a range of luxurious resorts and hotels. Many of these establishments provide private villas and overwater bungalows, allowing guests to immerse themselves in the beauty of the surroundings while enjoying privacy and exclusivity. These accommodations often come with direct access to the clear lagoon waters, allowing guests to swim, snorkel, or simply bask in the sun from their doorstep.",
        "The Maldives is not only a haven for beach lovers and water enthusiasts but also a place where culture and tradition thrive. The local population, influenced by South Asian, Arab, and African traditions, showcases a vibrant and welcoming culture. Visitors can explore the capital city of Malé, with its bustling markets, historic landmarks, and ornate mosques. Additionally, experiencing the traditional music, dance, and cuisine of the Maldives is a delightful way to immerse oneself in the local culture.",
        "The people of the Maldives are known for their warmth and hospitality, making visitors feel truly welcomed. The island nation offers a sense of tranquility and escape from the hustle and bustle of everyday life, inviting visitors to unwind and rejuvenate amidst nature's beauty. In summary, the Maldives is a tropical paradise that captivates with its exquisite beaches, vibrant coral reefs, luxurious resorts, and rich cultural heritage. It is a destination that promises an unforgettable experience of relaxation, adventure, and cultural exploration.",
    ];

    function goToPrevious() {
        let isSelected: boolean = index === 0;
        let newIndex: number = isSelected ? images.length - 1 : index - 1;
        setIndex(newIndex);
    }

    function goToNext() {
        let isSelected: boolean = index === images.length - 1;
        let newIndex: number = isSelected ? 0 : index + 1;
        setIndex(newIndex);
    }

    function handleClick(i: number) {
        setIndex(i);
    }

    const Icon = isPlaying ? PauseIcon : PlayArrowRoundedIcon;

    useEffect(() => {
        if (isPlaying && intervalId === null) {
            const id = setInterval(() => {
                setIndex((prevIndex) => {
                    return prevIndex === 4 ? 0 : prevIndex + 1;
                });
            }, 3000);
            setIntervalId(id);
        } else if (!isPlaying && intervalId !== null) {
            clearInterval(intervalId);
            setIntervalId(null);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isPlaying, intervalId]);

    return (
        <Box
            position={"relative"}
            display={"flex"}
            className="mobile"
            height={"100vh"}
            width={"100vw"}
        >
            <Box boxSizing={"border-box"} flex={0.5}>
                <img className="main--img" src={images[index]} alt="Maldives" />
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    padding={"20px"}
                >
                    <ArrowBackIosRoundedIcon
                        onClick={goToPrevious}
                        sx={{ cursor: "pointer" }}
                    />
                    {images.map((image: string, i: number) => {
                        return (
                            <img
                                className="carousel--images"
                                onClick={() => handleClick(i)}
                                key={i}
                                src={image}
                                alt="Hello"
                                style={{
                                    filter:
                                        i !== index
                                            ? "grayscale(100%)"
                                            : "grayscale(0%)",
                                    cursor: "pointer",
                                }}
                            />
                        );
                    })}
                    <ArrowForwardIosRoundedIcon
                        sx={{ cursor: "pointer" }}
                        onClick={goToNext}
                    />
                </Box>
            </Box>
            <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                boxSizing={"border-box"}
                flex={0.5}
            >
                <Box height={"72%"}>
                    <h1 className="text">Maldives</h1>
                    <p className="text">{descs[index]}</p>
                </Box>
                <Box
                    marginTop={"40px"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{
                        backgroundColor: "#25BEDA",
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                    }}
                >
                    <Box
                        onClick={() => setIsPlaying((prev) => !prev)}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Icon sx={{ cursor: "pointer" }} className="color" />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default App;
