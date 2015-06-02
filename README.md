Google API
----------

A Meteor library to interact with Google's API.

Works with accounts-google to automatically handle refresh/access token changes and give you a simple API to make calls.

# Install

```
meteor add percolate:google-api
```

# Usage

To call the library, use the `get()` and `post()` functions:

```
GoogleApi.get('/your/api/path', options, callback);
```

If `callback` is provided (client or server), the call will be made **asynchronously**. 

On the client, if you do not provide a callback, the library will return a [Q promise](https://github.com/kriskowal/q). On the server, it will run **synchronously**.

If the user's access token has expired, it will transparently call the `exchangeRefreshToken` method to get a new refresh token.

# Tokens

If you are running client side or in a method call, the package will automatically use the OAuth access token of the current user, and use the refresh token to refresh it if it's out of date (saving to the database also).

If you are running from a context without a `Meteor.user()`, you can pass `{user: X}` in the `options` argument to achieve this behaviour.

# Contributions

Are welcome.

*MIT license, (c) Percolate Studio, maintained by Tom Coleman (@tmeasday).*
