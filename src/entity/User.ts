import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, DeleteDateColumn, AfterInsert, getConnection, AfterUpdate } from "typeorm";
// const connection = getConnection();

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field(() => Int)
  @Column()
  age: number;

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn()
  deletedAt: Date;

  // @AfterInsert()
  // async clearCache() {
  //   await connection.queryResultCache.remove(["users"]);

  // }

}
