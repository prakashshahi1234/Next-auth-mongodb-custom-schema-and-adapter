const mongoose = require("mongoose");
const crypto = require("crypto");
import accountSchema from "backend-utils/models/account";
import userSchema from "backend-utils/models/User";
import sessionSchema from "backend-utils/models/Session";

// Export the schemas as an object

export default function mongoDbAdapter() {
  const db = mongoose.createConnection(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const Account = db.model("Account", accountSchema);
  const Session = db.model("Session", sessionSchema);
  const User = db.model("User", userSchema);

  return {
    async createUser(profile) {
      try {
        // Create a new user object
        const user = new User({
          email: profile.email,
          name: profile.name,
          image: profile.image,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });

        // Save the user and account objects to the database
        await user.save();
        // await account.save()

        // Return the user object
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create user");
      }
    },

    async getUser(id) {
      try {
        // Find the user by ID
        const user = await User.findById(id);

        // Return the user object
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to get user");
      }
    },

    async getUserByEmail(email) {
      try {
        // Find the user by email address
        const user = await User.findOne({ email });

        // Return the user object
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to get user by email");
      }
    },

    async getUserByAccount({ providerAccountId, provider }) {
      try {
        // Find the account by provider and providerAccountId
        const account = await Account.findOne({
          provider,
          providerAccountId,
        });

        // If the account is found, get the associated user
        if (account) {
          const user = await User.findById(account.userId);
          return user;
        } else {
          return null;
        }
      } catch (error) {
        console.error(error);
        throw new Error("Failed to get user by account");
      }
    },

    async linkAccount(user) {
      try {
        // Get the user associated with the session
        const updatedUser = await User.findById(user.userId);

        // Create a new account object for the user
        const account = new Account(user);

        // Save the account object to the database
        await account.save();

        // Return the updated user object
        return updatedUser;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to link account");
      }
    },

    async createSession(x) {
      try {
        // Create a new session object for the user
        const session = new Session(x);

        // Save the session object to the database
        await session.save();

        // Return the session object
        return session;
      } catch (error) {
        throw new Error("Failed to create session");
      }
    },

    async getSessionAndUser(sessionToken) {
      try {
        // Find the session by sessionToken
        const session = await Session.findOne({ sessionToken });

        // If the session is found, get the associated user
        if (session) {
          const user = await User.findById(session.userId);
          return { session, user };
        } else {
          return null;
        }
      } catch (error) {
        console.error(error);
        throw new Error("Failed to get session and user");
      }
    },

    async updateSession({ sessionToken }) {
      try {
        // Update the session object with the new data

        Object.assign(session, updates);

        // Save the updated session object to the database
        await session.save();

        // Return the updated session object
        return session;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update session");
      }
    },

    async deleteSession(sessionToken) {
      try {
        // Delete the session by sessionToken
        await Session.deleteOne({ sessionToken });
      } catch (error) {
        console.error(error);
        throw new Error("Failed to delete session");
      }
    },

    async updateUser(user, updates) {
      try {
        // Update the user object with the new data
        Object.assign(user, updates);

        // Save the updated user object to the database
        await user.save();

        // Return the updated user object
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update user");
      }
    },
  };
}
