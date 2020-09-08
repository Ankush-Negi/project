import VersionableSchema from '../versionable/VersionableSchema';

export default class OrderSchema extends VersionableSchema {
  constructor(options: any) {
    const orderSchema = {
      products: [String],
    };
    super(orderSchema, options);
  }
}
