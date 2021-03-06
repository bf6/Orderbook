# Orderbook

An order book that uses data from [Crypto Facilities](cryptofacilities.com) to display info for BTC and ETH. Built with React Native and tested on iOS.

Other libraries used:

- [TailwindCSS](https://github.com/jaredh159/tailwind-react-native-classnames)
- [React Navigation](https://reactnavigation.org/docs/getting-started)

## Demo
[demo.mp4](https://user-images.githubusercontent.com/7946260/137658654-f0bebe35-3931-4813-8a40-87be8ef90178.mp4)

## Running locally
```
yarn install
npx pod-install
yarn ios
```

## Running tests
```
yarn test
```

## Running the linter
```
yarn lint
```

## Extending Tailwind
To create additional utility classes for Tailwind, update `tailwind.config.js` and run `yarn gen-styles` to generate new mappings.
