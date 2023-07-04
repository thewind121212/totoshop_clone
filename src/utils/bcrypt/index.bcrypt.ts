import  bcrypt from 'bcryptjs'

export const hashPassword = (password:string) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, function(err, salt) {
        if (err) {
          reject(err);
        } else {
          bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
              reject(err);
            } else {
              resolve(hash);
            }
          });
        }
      });
    });
  };
  
export const comparePasswords = (password:string, hashedPassword:string) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hashedPassword, function(err, isMatch) {
        if (err) {
          reject(err);
        } else {
          resolve(isMatch);
        }
      });
    });
  };