const hands = {
  straight: {
    'A-5': [
      { number: 'A', figure: '♦' },
      { number: '2', figure: '♥' },
      { number: '3', figure: '♦' },
      { number: '4', figure: '♣' },
      { number: '5', figure: '♦' },
    ],
    '2-6': [
      { number: '2', figure: '♦' },
      { number: '3', figure: '♥' },
      { number: '4', figure: '♦' },
      { number: '5', figure: '♣' },
      { number: '6', figure: '♦' },
    ],
    '3-7': [
      { number: '3', figure: '♦' },
      { number: '4', figure: '♥' },
      { number: '5', figure: '♦' },
      { number: '6', figure: '♣' },
      { number: '7', figure: '♦' },
    ],
    '4-8': [
      { number: '4', figure: '♦' },
      { number: '5', figure: '♥' },
      { number: '6', figure: '♦' },
      { number: '7', figure: '♣' },
      { number: '8', figure: '♦' },
    ],
    '5-9': [
      { number: '5', figure: '♦' },
      { number: '6', figure: '♥' },
      { number: '7', figure: '♦' },
      { number: '8', figure: '♣' },
      { number: '9', figure: '♦' },
    ],
    '6-10': [
      { number: '6', figure: '♦' },
      { number: '7', figure: '♥' },
      { number: '8', figure: '♦' },
      { number: '9', figure: '♣' },
      { number: '10', figure: '♦' },
    ],
    '7-J': [
      { number: '7', figure: '♥' },
      { number: '8', figure: '♦' },
      { number: '9', figure: '♣' },
      { number: '10', figure: '♦' },
      { number: 'J', figure: '♦' },
    ],
    '8-Q': [
      { number: '8', figure: '♦' },
      { number: '9', figure: '♣' },
      { number: '10', figure: '♦' },
      { number: 'J', figure: '♦' },
      { number: 'Q', figure: '♦' },
    ],
    '9-K': [
      { number: '9', figure: '♣' },
      { number: '10', figure: '♦' },
      { number: 'J', figure: '♦' },
      { number: 'Q', figure: '♦' },
      { number: 'K', figure: '♦' },
    ],
    '10-A': [
      { number: '10', figure: '♦' },
      { number: 'J', figure: '♦' },
      { number: 'Q', figure: '♦' },
      { number: 'K', figure: '♦' },
      { number: 'A', figure: '♣' },
    ],
  },
};

verificateHand(hands.straight['A-5'], '2');
