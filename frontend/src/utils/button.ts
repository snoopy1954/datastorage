export const getColor = (color: string) => {
    return color===("red" || "orange" || "yellow" || "olive" || "green" || "teal" || "blue" || "violet" ||
                    "purple" || "pink" || "brown" || "grey" || "black" || "facebook" || "google plus" ||
                    "vk" || "twitter" || "linkedin" || "instagram" || "youtube") ? color : "blue";
}