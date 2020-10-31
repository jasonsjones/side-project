import {
    Query,
    Resolver,
    InputType,
    Field,
    Mutation,
    Args,
    ResolveField,
    Parent
} from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';

@InputType()
class RegisterUserInput {
    @Field()
    firstName!: string;

    @Field()
    lastName!: string;

    @Field()
    email!: string;

    @Field()
    password!: string;
}

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => [User])
    users(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @ResolveField('displayName', (returns) => String)
    getDisplayName(@Parent() user: User) {
        return `${user.firstName} ${user.lastName}`;
    }

    @Mutation(() => User)
    async registerUser(@Args('userData') userData: RegisterUserInput): Promise<User> {
        const newUser = await this.userService.create(userData);
        return newUser;
    }
}
