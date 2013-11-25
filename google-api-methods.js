Meteor.methods({
  // Obtain a new access token using the refresh token
  exchangeRefreshToken: function() {
    this.unblock();

    var config = Accounts.loginServiceConfiguration.findOne({service: "google"});
    if (!config)
      throw new Meteor.Error(500, "Google service not configured.");

    if (!Meteor.user().services.google || !Meteor.user().services.google.refreshToken)
      throw new Meteor.Error(500, "Refresh token not found.");

    var result = Meteor.http.call("POST",
      "https://accounts.google.com/o/oauth2/token",
      {
        params: {
          'client_id': config.clientId,
          'client_secret': config.secret,
          'refresh_token': Meteor.user().services.google.refreshToken,
          'grant_type': 'refresh_token'
        }
    });
    
    if (result.statusCode === 200) {
      // console.log('success');
      // console.log(EJSON.stringify(result.data));

      Meteor.users.update(Meteor.userId(), { 
        '$set': { 
          'services.google.accessToken': result.data.access_token,
          'services.google.expiresAt': (+new Date) + (1000 * result.data.expires_in),
        }
      });

      return result.data;
    } else {
      throw new Meteor.Error(500, 'Unable to exchange google refresh token.', result);
    }
  }
});