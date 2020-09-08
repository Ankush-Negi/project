import IVersionableDocument from '../versionable/IVersionableDocument';
export default interface IProductModel extends IVersionableDocument {
  originalId: string;
  products: string[];
}
