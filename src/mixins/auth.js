import
{
	CognitoUserPool,
	AuthenticationDetails,
	CognitoUser
}
from 'amazon-cognito-identity-js';

const pool = new CognitoUserPool(
{
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    ClientId:   process.env.COGNITO_CLIENT_ID,
});

var cognitoUser = pool.getCurrentUser();

export default {
    name: 'auth',
    methods:
    {
        isLogged()
        {
            return cognitoUser != null;
        },
        getUser()
        {

            var auth = this;

            return new Promise(function(resolve, reject)
            {

                if(!auth.isLogged()) return reject();

                cognitoUser.getSession(function(err, session)
                {
                    if(err) reject();
                    resolve(session);
                });

            });

        },
        login(user, pass)
        {

            return new Promise(function(resolve, reject)
            {

                if(!user || !pass)
                {
                    reject("You must supply user and password");
                }

                let authDetails = new AuthenticationDetails(
                {
                    Username: user,
                    Password: pass
                });

                cognitoUser = new CognitoUser(
                {
                    Username: user,
                    Pool: pool
                });

                cognitoUser.authenticateUser(authDetails,
                {
                    onSuccess: function (result)
                    {
                        return resolve(result)
                    },
                    onFailure: function(err)
                    {
                        if(err.statusCode != 200)
                        {
                            return reject(err);
                        }
                        return resolve(true);
                    },
                    newPasswordRequired: function(userAttributes, requiredAttributes)
                    {
                        //console.log(userAttributes, requiredAttributes);
                        return reject({ code: "PASSWORD_CHANGE", 
						user :  user
						});
                    }

                });

            });
        },
        signOut()
        {
            pool.getCurrentUser().signOut();
        },
        resetPassword(user)
        {

            return new Promise((resolve, reject) =>
            {

                cognitoUser = new CognitoUser(
                {
                    Username: user,
                    Pool:     pool
                });

                cognitoUser.forgotPassword(
                {
                    onSuccess: resolve,
                    onFailure: reject,
                    inputVerificationCode: () => resolve({ code: 'CONFIRM_PASSWORD' })
                });

            });

        },
        confirmPassword(verificationCode, newPassword)
        {

            return new Promise((resolve, reject) =>
            {
                cognitoUser.confirmPassword(verificationCode, newPassword,
                {
                    onSuccess: resolve,
                    onFailure: reject,
                });
            });

        },
        changePassword(oldPassword, newPassword)
        {
            return new Promise(function(resolve, reject)
            {
                cognitoUser.changePassword(oldPassword, newPassword, function(err, result)
                {

                    if(err)
                    {
                        reject(err);
                    }

                    resolve(result);

                });
            });
        },
        changeTemporaryPassword(newPassword)
        {
            return new Promise(function(resolve, reject)
            {
                cognitoUser.completeNewPasswordChallenge(newPassword, [],
                {
                    onSuccess: resolve,
                    onFailure: reject
                });
            });
        },
        retrieveToken()
        {

            return new Promise(function(resolve, reject)
            {

                if(!pool.getCurrentUser())
                {
                    return reject('No current user');
                }

                pool.getCurrentUser().getSession(function(err, result)
                {
                    if(err)
                    {
                        return reject(err);
                    }
                    return resolve(result.idToken.jwtToken);

                });

            });
        },
        retrieveUserShowData()
        {

            return new Promise(function(resolve, reject)
            {

                if(!pool.getCurrentUser())
                {
                    return reject('No current user');
                }

                pool.getCurrentUser().getSession(function(err, result)
                {
                    if(err)
                    {
                        return reject(err);
                    }
                    return resolve(result);

                });

            });
        }
    }
}