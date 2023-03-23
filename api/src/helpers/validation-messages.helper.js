const generateRequiredMessage = (attributeName) =>
    `Pole ${attributeName} jest wymagane!`;

const generateMinNumberMessage = (attributeName, min) =>
    `Pole ${attributeName} musi wynosić minimum ${min}!`;

const generateMinLengthMessage = (attributeName, min) =>
    `Pole ${attributeName} musi mieć minimum ${min} znaków!`;

const generateNumberMessage = (attributeName) =>
    `Pole ${attributeName} musi być liczbą!`;

const generateStringMessage = (attributeName) =>
    `Pole ${attributeName} musi być ciągiem znaków!`;

const messageGenerators = {
    generateRequiredMessage,
    generateMinNumberMessage,
    generateMinLengthMessage,
    generateNumberMessage,
    generateStringMessage,
};

export default messageGenerators;
