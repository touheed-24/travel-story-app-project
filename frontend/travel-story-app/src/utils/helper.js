export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (name) => {
    if(!name) return "";

    const words = name.split(" ");
    let initials = "";

    for(let i=0; i < Math.min(words.length, 2); i++){
        initials += words[i][0];
    }

    return initials.toUpperCase();
};


export const getEmptyCardMessage =(filterType) => {
    switch (filterType) {
        case 'search':
            return `Oops! No stories found matching your search.`;

        case 'date':
            return `Oops! No stories found in given date range.`;
    
        default:
            return `'Start creating your first Travel Story! Click the "Add" button to express your thoughts, experiences and memories. Lets get started'`;
    }
};