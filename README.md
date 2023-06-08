# portatoapp

## How to build

Execute the following command to build the application locally:

```
cd portato
npm install
npm start
```

## Deployment with Firebase

Start by adding the API key to your environment f   ile. To do so, create a ´.env.local´ in the portato directory if you don't already have it.

Add the following to your environment file:

```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key_here
```

Then go to the [firebase project settings](https://console.firebase.google.com/project/portatoapp/settings/general/web:MDIyZWQwZjktMjRlNy00ZjNmLWFhOTgtYWRjMWRkZWEyOGFk) and copy the API key to your environment file including the quotation marks.

Then to deploy run the following commands within the portato directory:

```
npm install
npm run build
firebase login
firebase deploy
```

In case ´firebase login´ command returns ´firesbase: command not found´; execute the following command:

```
sudo npm install -g firebase-tools
```

### Pre-commit hook

Before you can run hooks, you need to have the pre-commit package manager installed.

Using pip:

```
pip install pre-commit
```

Install the git hook scripts by running:

```
pre-commit install
```

now pre-commit will run automatically on git commit!
