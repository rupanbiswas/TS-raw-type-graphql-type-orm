import { Mutation, Resolver, Arg, Int, Query, InputType, Field, FieldResolver, Root, ResolverInterface } from "type-graphql";
import { getConnection, getRepository } from "typeorm";
import { User } from "../entity/User";


// const userRepo = getRepository(User);

@InputType()
class userCreateType {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => Int)
  age: number;
}

@InputType()
class userUpdateType {
  @Field(() => String, { nullable: true })
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName: string;

  @Field(() => Int, { nullable: true })
  age: number;
}
// implements ResolverInterface<User>
@Resolver(() => User)
export class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("options", () => userCreateType) options: userCreateType) {
    const connection = getConnection("default");
    await connection.queryResultCache.remove(["users"]);
    const user = await User.create(options).save();
    return user;
  }

  @Query(() => [User])
  async readUser() {
    return User.find({ cache: { id: "users", milliseconds: 60000 } });
  }

  @Mutation(() => Boolean)
  async updateUser(
    @Arg("id", () => Int) id: number,
    @Arg("options", () => userUpdateType) options: userUpdateType
  ) {
    // await connection.queryResultCache.remove(["users"]);
    const user = await User.update({ id }, options);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", () => Int) id: number) {
    // await connection.queryResultCache.remove(["users"]);
    const user = await User.findOneOrFail({ id });
    await User.softRemove(user);
    return true;
  }

  @FieldResolver()
  hello(@Root() user: User): number {
    // const uname = await User.findOne(user.id)

    return 12;
  }
}
