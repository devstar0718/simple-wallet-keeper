# Simple Wallet Keeper

This assignment is to build a small frontend that stores user’s wallets securely.

## Task

The task is to create a simple website that allow users to generate, store and fetch wallets.

### User’s requirements

-   Users would like to click a button to generate a Wallet.
-   Users would like to see a list of generated wallets.
-   Users would like to see their private keys by entering their password.
-   Users would like to see their balance in testnet networks

### Key points

-   Wallets should be compatible with EVM networks such as **BNB Chain** or **Ethereum**
-   You can store the list of wallets in local storage.
-   You should NOT store user’s passwords.
-   You should NOT store user’s private keys in plaintext.

### What we would like to see

-   Testing.
-   Use of React hooks.
-   State management.
-   Architecture considerations.
-   Simplicity.

### Considerations

-   We will not focus on design or UI.
-   You can use Next.js or create-react-app to bootstrap your solution.
-   You can use Redux
-   You cannot use a UI kit.

## Implementation

### Features

-   **Create Wallet**

    Users can create a wallet by clicking "Create Wallet" button on the top right of the screen.

-   **List All Generated Wallets**

    Users can see all created wallet in the drop down list and can switch the current wallet.\
    The list of generated wallets are stored in local storage.

-   **Export Private Key**

    For created wallets, users can export private key by clicking 'Export Private Key" button on the top right of the screen.\
    It will requires password to export the private key, and the password is
    **`123456`** which is hard-coded in the codes.

-   **Add, Remove, Update Network**

    Users can add, remove, update network by clicking buttons on the main panel.
    All BNB and EVM networks are available to manage.\
    The created networks are stored in local storage.

-   **Show Balance**

    For added networks, users can see the balance of the selected network.

### How to use

-   `npm start`

    Runs the app in the development mode.\
    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

    The page will reload when you make changes.\
    You may also see any lint errors in the console.

-   `npm test`

    Launches the test runner in the interactive watch mode.\
     See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

-   `npm run build`

    Builds the app for production to the `build` folder.\
     It correctly bundles React in production mode and optimizes the build for the best performance.

    The build is minified and the filenames include the hashes.\
     Your app is ready to be deployed!

    See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
