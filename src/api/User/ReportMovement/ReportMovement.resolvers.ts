import { ReportMovementMutationArgs } from "./../../../types/graph.d";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { ReportMovementResponse } from "../../../types/graph";
import User from "../../../entities/User";
import cleanNullArgs from "../../../utils/cleanNullArg";

const resolvers: Resolvers = {
  Mutation: {
    ReportMovement: privateResolver(
      async (
        _,
        args: ReportMovementMutationArgs,
        { req, pubSub }
      ): Promise<ReportMovementResponse> => {
        const user: User = req.user;
        console.log(args);
        const notNull = cleanNullArgs(args);

        try {
          console.log("debug---");
          console.log(user.id);

          console.log(notNull);
          console.log("debug---");
          await User.update({ id: user.id }, { ...notNull });
          pubSub.publish("driverUpdate", { DriversSubscription: user });
          return {
            ok: true,
            error: null
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message
          };
        }
      }
    )
  }
};

export default resolvers;
