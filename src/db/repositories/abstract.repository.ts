import { DeleteResult, Model, MongooseUpdateQueryOptions, ProjectionType, QueryOptions, RootFilterQuery, Types, UpdateQuery } from 'mongoose';

export class AbstractRepository<T> {
  constructor(private readonly _model: Model<T>) {}

  async create(item: Partial<T>) {
    return await this._model.create(item);
  }

  async findOne(filter: RootFilterQuery<T>, projection?: ProjectionType<T>, options?: QueryOptions<T>) {
    return await this._model.findOne(filter, projection, options);
  }

  async findById(id: Types.ObjectId, projection?: ProjectionType<T>, options?: QueryOptions<T>) {
    return await this._model.findById(id, projection, options);
  }

  async updateOne(filter: RootFilterQuery<T>, update: UpdateQuery<T>, options?: MongooseUpdateQueryOptions<T>) {
    return await this._model.updateOne(filter, update, options);
  }

  async deleteOne(filter: RootFilterQuery<T>): Promise<DeleteResult> {
    return await this._model.deleteOne(filter);
  }
}
