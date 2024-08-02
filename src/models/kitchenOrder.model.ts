import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Recipes } from "./recipes.model";

@Entity("kitchen_orders")
export class KitchenOrders {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column({ type: "uuid", name: "order_uuid" })
  orderUuid: string;

  @Column({ type: "integer", name: "recipe_id" })
  recipeId: number;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at" })
  updatedAt: Date;

  @BeforeInsert()
  updateDateCreation() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  updateDateUpdate() {
    this.updatedAt = new Date();
  }

  @ManyToOne(() => Recipes, (recipe) => recipe.id)
  @JoinColumn({ name: "recipe_id", referencedColumnName: "id" })
  recipe: Recipes;
}
