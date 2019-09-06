8/28/19

TODO: 
      -replace mLab w/ Atlas?


* from docs.mlab.com/mlab-to-atlas
    Q. Can I migrate now to Atlas?
If you would like to migrate to Atlas now, it is possible although it will not be quite as easy as if you were to wait. If you are migrating into Atlas tiers which use shared resources (the M0, M2, or M5 tiers), we recommend waiting until mid-September when we have introduced a tool to make this much easier.

can just use Atlas instead of mLab??
prereq's: -whitelist ya IP address
          -create a MongoDB User
          -open ports 27015 to 27017
          -curl -i -u "username:apiKey" --digest "https://cloud.mongodb.com/api/atlas/v1.0/groups/5356823b3794de37132bb7b/clusters"

-Pivot: tried to setup Atlas, is not working. So going to pivot to just using mLab, since MongoDB is going to provide migration support to Atlas later on this year.

FIREBASE:
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/6.4.2/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#config-web-app -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBdADmttyJkdeia2CFEiuURrWExAjak5Xw",
    authDomain: "dashboard-shard.firebaseapp.com",
    databaseURL: "https://dashboard-shard.firebaseio.com",
    projectId: "dashboard-shard",
    storageBucket: "",
    messagingSenderId: "149942588551",
    appId: "1:149942588551:web:c53653979e852210"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>

* https://blog.bitsrc.io/react-oauth-authentication-with-firebase-dfe0e8c5d0d4?source=post_page-----6c7c45fbe458---------------------- 

* https://github.com/esausilva/react-firebase-oauth

* https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial


fuck firebase

* AuthO:  https://auth0.com/pricing/
          https://auth0.com/docs/quickstart/spa/react

* Passport.JS:  https://github.com/jwalton/passport-api-docs

* Node.JS:    https://github.com/santiq/nodejs-auth

* Atlas:      https://www.mongodb.com/presentations/back-to-basics-your-first-application-with-mongodb-atlas



9/4/19:
