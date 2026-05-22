import { Model, MongooseUpdateQueryOptions, ProjectionType, QueryFilter, QueryOptions, Types, UpdateQuery } from "mongoose";

export abstract class AbstractRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  create(item: Partial<T>) {
    return this.model.create(item);
  }

  findOne(filter: QueryFilter<T>, projection?: ProjectionType<T>, options?: QueryOptions<T>) {
    return this.model.findOne(filter, projection, options);
  }

  findAll(filter?: QueryFilter<T>, projection?: ProjectionType<T>, options?: QueryOptions<T>) {
    return this.model.find(filter, projection, options);
  }

  findMany(filter: QueryFilter<T>, projection?: ProjectionType<T>, options?: QueryOptions<T>) {
    return this.model.find(filter, projection, options);
  }

  findById(id: Types.ObjectId, projection?: ProjectionType<T>, options?: QueryOptions<T>) {
    return this.model.findById(id, projection, options);
  }

  updateOne(filter: QueryFilter<T>, update: UpdateQuery<T>, options?: MongooseUpdateQueryOptions<T>) {
    return this.model.updateOne(filter, update, options);
  }

  findByIdAndUpdate(id: Types.ObjectId, update: UpdateQuery<T>, options?: MongooseUpdateQueryOptions<T>) {
    return this.model.updateOne({ _id: id }, update, options);
  }

  deleteOne(filter: QueryFilter<T>) {
    return this.model.deleteOne(filter);
  }

  deleteMany(filter: QueryFilter<T>) {
    return this.model.deleteMany(filter);
  }
}
