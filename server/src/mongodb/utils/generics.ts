import { Model } from 'mongoose';

interface HasId {
  id: string;
}

interface CastDependencies<T> {
  castInterfaceToMongo: (int: T) => any;
  castMongoToInterface: (mongo: any) => T;
  Model: Model<any>;
}

interface CastFieldDependencies<T> extends CastDependencies<T> {
  field: string;
}

export function getModelByField<T extends HasId, F>({
  castMongoToInterface,
  Model,
  field
}: CastFieldDependencies<T>) {
  return async function(fieldValue: F): Promise<T | null> {
    const [model] = await Model.find({ [field]: fieldValue });

    if (model) {
      return castMongoToInterface(model);
    }

    return null;
  };
}

export function getManyModelByField<T extends HasId, F>({
  castMongoToInterface,
  Model,
  field
}: CastFieldDependencies<T>) {
  return async function(
    fieldValue: F,
    skip: number = 0,
    limit: number = 0
  ): Promise<T[]> {
    const models = await Model.find({ [field]: fieldValue })
      .skip(skip)
      .limit(limit);

    return models.map(castMongoToInterface);
  };
}

export function getModelById<T extends HasId>({
  castMongoToInterface,
  Model
}: CastDependencies<T>) {
  return async function(id: string): Promise<T | null> {
    const model = await Model.findById(id);

    if (model) {
      return castMongoToInterface(model);
    }

    return null;
  };
}

export function saveModel<T extends HasId>({
  castInterfaceToMongo,
  castMongoToInterface,
  Model
}: CastDependencies<T>) {
  return async function(model: T): Promise<T> {
    try {
      await Model.findByIdAndUpdate(model.id, castInterfaceToMongo(model));
      return model;
    } catch (e) {
      const newUser = new Model(castInterfaceToMongo(model));
      await newUser.save();
      return castMongoToInterface(newUser);
    }
  };
}

export function removeModel<T extends HasId>({ Model }: CastDependencies<T>) {
  return async function(model: T): Promise<T> {
    return Model.findByIdAndDelete(model.id);
  };
}
