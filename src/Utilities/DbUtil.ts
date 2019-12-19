import { Tables } from "../Mappers/Tables";

class DbUtil {
  /**
   * ParseRows
   * Parses the rows from DB and adds it as a collection
   *
   * In order to remove this frameworks stupid ass rowdatapack shit this had to be done.
   *
   * @static
   */
  public static ParseRows = (rows: any, table: Tables): any => {
    const resultArray: any = {};
    resultArray[table] = Object.values(JSON.parse(JSON.stringify(rows)));
    return resultArray;
  }

  /**
   * MergeObjects
   *
   * @static
   */
  public static MergeObjects = (...collections: any): object => {
    return { ...collections };
  }

  /**
   * Prepares a singular object to be used for Factory methods that takes Table Keys with an array of items.
   *
   * @static
   * @param {*} obj
   * @param {Tables} table
   * @returns {object}
   */
  public static PrepareObjectForFactory(obj: any, table: Tables): object {
    const newobj: any = {};
    newobj[table] = [];
    newobj[table].push(obj);
    return newobj;
  }

  /**
   * WhereIn
   * @TODO
   *
   * @static
   * @return {string} SELECT * FROM X WHERE Y in '(1, 2, 3, 5)'
   */
  public static WhereIn = (numbers: any[]): string => {
    return "";
  }

  /**
   * Merges collections from Db.
   *
   * @static
   */
  public static FlattenPromiseData = (collection: any[]) => {
    return Object.assign({}, ...collection);
  }

  // public map<T>(values: Partial<T>, ctor: new () => T): T {
  //     const instance = new ctor();

  //     return Object.keys(instance).reduce((acc: any, key: ) => {
  //         acc[key] = values[key];
  //         return acc;
  //     }, {}) as T;
  // }
}

export default DbUtil;
