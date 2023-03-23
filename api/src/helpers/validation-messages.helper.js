const generateRequiredMessage = (attributeName) =>
    `Pole ${attributeName} jest wymagane!`;

const generateMinNumberMessage = (attributeName, min) =>
    `Pole ${attributeName} musi wynosić minimum ${min}!`;

const generateMinLengthMessage = (attributeName, min) =>
    `Pole ${attributeName} musi mieć minimum ${min} znaków!`;

const generateMaxNumberMessage = (attributeName, max) =>
    `Pole ${attributeName} musi wynosić maximum ${max}!`;

const generateMaxLengthMessage = (attributeName, max) =>
    `Pole ${attributeName} może mieć maks ${max} znaków!`;

const generateNumberMessage = (attributeName) =>
    `Pole ${attributeName} musi być liczbą!`;

const generateStringMessage = (attributeName) =>
    `Pole ${attributeName} musi być ciągiem znaków!`;

const messageGenerators = {
    generateRequiredMessage,
    generateMinNumberMessage,
    generateMinLengthMessage,
    generateMaxNumberMessage,
    generateMaxLengthMessage,
    generateNumberMessage,
    generateStringMessage
};

export default messageGenerators;
