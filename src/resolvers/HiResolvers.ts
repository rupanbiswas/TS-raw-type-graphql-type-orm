import { Query, Resolver } from "type-graphql";

@Resolver()
export class HiResolvers {
    @Query(()=>String)
    hi(){
        return "Hello World!"
    }

}