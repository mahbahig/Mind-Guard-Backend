import { DeleteResult, Model, MongooseUpdateQueryOptions, ProjectionType, QueryOptions, Types, UpdateQuery, QueryFilter } from 'mongoose';

export class AbstractRepository<T> {
  constructor(private readonly _model: Model<T>) {}

  create(item: Partial<T>) {
    return this._model.create(item);
  }

  findOne(filter: QueryFilter<T>, projection?: ProjectionType<T>, options?: QueryOptions<T>) {
    return this._model.findOne(filter, projection, options);
  }

  findAll(filter?: QueryFilter<T>, projection?: ProjectionType<T>, options?: QueryOptions<T>) {
    return this._model.find(filter, projection, options);
  }

  findMany(filter: QueryFilter<T>, projection?: ProjectionType<T>, options?: QueryOptions<T>) {
    return this._model.find(filter, projection, options);
  }

  findById(id: Types.ObjectId, projection?: ProjectionType<T>, options?: QueryOptions<T>) {
    return this._model.findById(id, projection, options);
  }

  updateOne(filter: QueryFilter<T>, update: UpdateQuery<T>, options?: MongooseUpdateQueryOptions<T>) {
    return this._model.updateOne(filter, update, options);
  }

  findByIdAndUpdate(id: Types.ObjectId, update: UpdateQuery<T>, options?: MongooseUpdateQueryOptions<T>) {
    return this._model.updateOne({ _id: id }, update, options);
  }

  deleteOne(filter: QueryFilter<T>): Promise<DeleteResult> {
    return this._model.deleteOne(filter);
  }

  deleteMany(filter: QueryFilter<T>): Promise<DeleteResult> {
    return this._model.deleteMany(filter);
  }
}
