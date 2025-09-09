
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model categories
 * 
 */
export type categories = $Result.DefaultSelection<Prisma.$categoriesPayload>
/**
 * Model expenses
 * 
 */
export type expenses = $Result.DefaultSelection<Prisma.$expensesPayload>
/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>
/**
 * Model incomes
 * 
 */
export type incomes = $Result.DefaultSelection<Prisma.$incomesPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Categories
 * const categories = await prisma.categories.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Categories
   * const categories = await prisma.categories.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.categories`: Exposes CRUD operations for the **categories** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.categories.findMany()
    * ```
    */
  get categories(): Prisma.categoriesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.expenses`: Exposes CRUD operations for the **expenses** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Expenses
    * const expenses = await prisma.expenses.findMany()
    * ```
    */
  get expenses(): Prisma.expensesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.incomes`: Exposes CRUD operations for the **incomes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Incomes
    * const incomes = await prisma.incomes.findMany()
    * ```
    */
  get incomes(): Prisma.incomesDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.15.0
   * Query Engine version: 85179d7826409ee107a6ba334b5e305ae3fba9fb
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    categories: 'categories',
    expenses: 'expenses',
    users: 'users',
    incomes: 'incomes'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "categories" | "expenses" | "users" | "incomes"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      categories: {
        payload: Prisma.$categoriesPayload<ExtArgs>
        fields: Prisma.categoriesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.categoriesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.categoriesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          findFirst: {
            args: Prisma.categoriesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.categoriesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          findMany: {
            args: Prisma.categoriesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>[]
          }
          create: {
            args: Prisma.categoriesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          createMany: {
            args: Prisma.categoriesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.categoriesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>[]
          }
          delete: {
            args: Prisma.categoriesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          update: {
            args: Prisma.categoriesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          deleteMany: {
            args: Prisma.categoriesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.categoriesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.categoriesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>[]
          }
          upsert: {
            args: Prisma.categoriesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          aggregate: {
            args: Prisma.CategoriesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategories>
          }
          groupBy: {
            args: Prisma.categoriesGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoriesGroupByOutputType>[]
          }
          count: {
            args: Prisma.categoriesCountArgs<ExtArgs>
            result: $Utils.Optional<CategoriesCountAggregateOutputType> | number
          }
        }
      }
      expenses: {
        payload: Prisma.$expensesPayload<ExtArgs>
        fields: Prisma.expensesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.expensesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expensesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.expensesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expensesPayload>
          }
          findFirst: {
            args: Prisma.expensesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expensesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.expensesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expensesPayload>
          }
          findMany: {
            args: Prisma.expensesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expensesPayload>[]
          }
          create: {
            args: Prisma.expensesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expensesPayload>
          }
          createMany: {
            args: Prisma.expensesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.expensesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expensesPayload>[]
          }
          delete: {
            args: Prisma.expensesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expensesPayload>
          }
          update: {
            args: Prisma.expensesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expensesPayload>
          }
          deleteMany: {
            args: Prisma.expensesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.expensesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.expensesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expensesPayload>[]
          }
          upsert: {
            args: Prisma.expensesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expensesPayload>
          }
          aggregate: {
            args: Prisma.ExpensesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExpenses>
          }
          groupBy: {
            args: Prisma.expensesGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExpensesGroupByOutputType>[]
          }
          count: {
            args: Prisma.expensesCountArgs<ExtArgs>
            result: $Utils.Optional<ExpensesCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      incomes: {
        payload: Prisma.$incomesPayload<ExtArgs>
        fields: Prisma.incomesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.incomesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$incomesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.incomesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$incomesPayload>
          }
          findFirst: {
            args: Prisma.incomesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$incomesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.incomesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$incomesPayload>
          }
          findMany: {
            args: Prisma.incomesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$incomesPayload>[]
          }
          create: {
            args: Prisma.incomesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$incomesPayload>
          }
          createMany: {
            args: Prisma.incomesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.incomesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$incomesPayload>[]
          }
          delete: {
            args: Prisma.incomesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$incomesPayload>
          }
          update: {
            args: Prisma.incomesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$incomesPayload>
          }
          deleteMany: {
            args: Prisma.incomesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.incomesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.incomesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$incomesPayload>[]
          }
          upsert: {
            args: Prisma.incomesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$incomesPayload>
          }
          aggregate: {
            args: Prisma.IncomesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIncomes>
          }
          groupBy: {
            args: Prisma.incomesGroupByArgs<ExtArgs>
            result: $Utils.Optional<IncomesGroupByOutputType>[]
          }
          count: {
            args: Prisma.incomesCountArgs<ExtArgs>
            result: $Utils.Optional<IncomesCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    categories?: categoriesOmit
    expenses?: expensesOmit
    users?: usersOmit
    incomes?: incomesOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CategoriesCountOutputType
   */

  export type CategoriesCountOutputType = {
    expenses: number
  }

  export type CategoriesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    expenses?: boolean | CategoriesCountOutputTypeCountExpensesArgs
  }

  // Custom InputTypes
  /**
   * CategoriesCountOutputType without action
   */
  export type CategoriesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesCountOutputType
     */
    select?: CategoriesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoriesCountOutputType without action
   */
  export type CategoriesCountOutputTypeCountExpensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: expensesWhereInput
  }


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    categories: number
    expenses: number
    incomes: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categories?: boolean | UsersCountOutputTypeCountCategoriesArgs
    expenses?: boolean | UsersCountOutputTypeCountExpensesArgs
    incomes?: boolean | UsersCountOutputTypeCountIncomesArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: categoriesWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountExpensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: expensesWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountIncomesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: incomesWhereInput
  }


  /**
   * Models
   */

  /**
   * Model categories
   */

  export type AggregateCategories = {
    _count: CategoriesCountAggregateOutputType | null
    _avg: CategoriesAvgAggregateOutputType | null
    _sum: CategoriesSumAggregateOutputType | null
    _min: CategoriesMinAggregateOutputType | null
    _max: CategoriesMaxAggregateOutputType | null
  }

  export type CategoriesAvgAggregateOutputType = {
    id: number | null
    budget: Decimal | null
    userid: number | null
  }

  export type CategoriesSumAggregateOutputType = {
    id: number | null
    budget: Decimal | null
    userid: number | null
  }

  export type CategoriesMinAggregateOutputType = {
    id: number | null
    name: string | null
    budget: Decimal | null
    createdat: Date | null
    updatedat: Date | null
    userid: number | null
  }

  export type CategoriesMaxAggregateOutputType = {
    id: number | null
    name: string | null
    budget: Decimal | null
    createdat: Date | null
    updatedat: Date | null
    userid: number | null
  }

  export type CategoriesCountAggregateOutputType = {
    id: number
    name: number
    budget: number
    createdat: number
    updatedat: number
    userid: number
    _all: number
  }


  export type CategoriesAvgAggregateInputType = {
    id?: true
    budget?: true
    userid?: true
  }

  export type CategoriesSumAggregateInputType = {
    id?: true
    budget?: true
    userid?: true
  }

  export type CategoriesMinAggregateInputType = {
    id?: true
    name?: true
    budget?: true
    createdat?: true
    updatedat?: true
    userid?: true
  }

  export type CategoriesMaxAggregateInputType = {
    id?: true
    name?: true
    budget?: true
    createdat?: true
    updatedat?: true
    userid?: true
  }

  export type CategoriesCountAggregateInputType = {
    id?: true
    name?: true
    budget?: true
    createdat?: true
    updatedat?: true
    userid?: true
    _all?: true
  }

  export type CategoriesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which categories to aggregate.
     */
    where?: categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoriesOrderByWithRelationInput | categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned categories
    **/
    _count?: true | CategoriesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoriesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategoriesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoriesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoriesMaxAggregateInputType
  }

  export type GetCategoriesAggregateType<T extends CategoriesAggregateArgs> = {
        [P in keyof T & keyof AggregateCategories]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategories[P]>
      : GetScalarType<T[P], AggregateCategories[P]>
  }




  export type categoriesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: categoriesWhereInput
    orderBy?: categoriesOrderByWithAggregationInput | categoriesOrderByWithAggregationInput[]
    by: CategoriesScalarFieldEnum[] | CategoriesScalarFieldEnum
    having?: categoriesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoriesCountAggregateInputType | true
    _avg?: CategoriesAvgAggregateInputType
    _sum?: CategoriesSumAggregateInputType
    _min?: CategoriesMinAggregateInputType
    _max?: CategoriesMaxAggregateInputType
  }

  export type CategoriesGroupByOutputType = {
    id: number
    name: string | null
    budget: Decimal | null
    createdat: Date | null
    updatedat: Date | null
    userid: number | null
    _count: CategoriesCountAggregateOutputType | null
    _avg: CategoriesAvgAggregateOutputType | null
    _sum: CategoriesSumAggregateOutputType | null
    _min: CategoriesMinAggregateOutputType | null
    _max: CategoriesMaxAggregateOutputType | null
  }

  type GetCategoriesGroupByPayload<T extends categoriesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoriesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoriesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoriesGroupByOutputType[P]>
            : GetScalarType<T[P], CategoriesGroupByOutputType[P]>
        }
      >
    >


  export type categoriesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    budget?: boolean
    createdat?: boolean
    updatedat?: boolean
    userid?: boolean
    users?: boolean | categories$usersArgs<ExtArgs>
    expenses?: boolean | categories$expensesArgs<ExtArgs>
    _count?: boolean | CategoriesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categories"]>

  export type categoriesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    budget?: boolean
    createdat?: boolean
    updatedat?: boolean
    userid?: boolean
    users?: boolean | categories$usersArgs<ExtArgs>
  }, ExtArgs["result"]["categories"]>

  export type categoriesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    budget?: boolean
    createdat?: boolean
    updatedat?: boolean
    userid?: boolean
    users?: boolean | categories$usersArgs<ExtArgs>
  }, ExtArgs["result"]["categories"]>

  export type categoriesSelectScalar = {
    id?: boolean
    name?: boolean
    budget?: boolean
    createdat?: boolean
    updatedat?: boolean
    userid?: boolean
  }

  export type categoriesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "budget" | "createdat" | "updatedat" | "userid", ExtArgs["result"]["categories"]>
  export type categoriesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | categories$usersArgs<ExtArgs>
    expenses?: boolean | categories$expensesArgs<ExtArgs>
    _count?: boolean | CategoriesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type categoriesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | categories$usersArgs<ExtArgs>
  }
  export type categoriesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | categories$usersArgs<ExtArgs>
  }

  export type $categoriesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "categories"
    objects: {
      users: Prisma.$usersPayload<ExtArgs> | null
      expenses: Prisma.$expensesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string | null
      budget: Prisma.Decimal | null
      createdat: Date | null
      updatedat: Date | null
      userid: number | null
    }, ExtArgs["result"]["categories"]>
    composites: {}
  }

  type categoriesGetPayload<S extends boolean | null | undefined | categoriesDefaultArgs> = $Result.GetResult<Prisma.$categoriesPayload, S>

  type categoriesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<categoriesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoriesCountAggregateInputType | true
    }

  export interface categoriesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['categories'], meta: { name: 'categories' } }
    /**
     * Find zero or one Categories that matches the filter.
     * @param {categoriesFindUniqueArgs} args - Arguments to find a Categories
     * @example
     * // Get one Categories
     * const categories = await prisma.categories.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends categoriesFindUniqueArgs>(args: SelectSubset<T, categoriesFindUniqueArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Categories that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {categoriesFindUniqueOrThrowArgs} args - Arguments to find a Categories
     * @example
     * // Get one Categories
     * const categories = await prisma.categories.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends categoriesFindUniqueOrThrowArgs>(args: SelectSubset<T, categoriesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesFindFirstArgs} args - Arguments to find a Categories
     * @example
     * // Get one Categories
     * const categories = await prisma.categories.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends categoriesFindFirstArgs>(args?: SelectSubset<T, categoriesFindFirstArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categories that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesFindFirstOrThrowArgs} args - Arguments to find a Categories
     * @example
     * // Get one Categories
     * const categories = await prisma.categories.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends categoriesFindFirstOrThrowArgs>(args?: SelectSubset<T, categoriesFindFirstOrThrowArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.categories.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.categories.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoriesWithIdOnly = await prisma.categories.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends categoriesFindManyArgs>(args?: SelectSubset<T, categoriesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Categories.
     * @param {categoriesCreateArgs} args - Arguments to create a Categories.
     * @example
     * // Create one Categories
     * const Categories = await prisma.categories.create({
     *   data: {
     *     // ... data to create a Categories
     *   }
     * })
     * 
     */
    create<T extends categoriesCreateArgs>(args: SelectSubset<T, categoriesCreateArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {categoriesCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const categories = await prisma.categories.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends categoriesCreateManyArgs>(args?: SelectSubset<T, categoriesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {categoriesCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const categories = await prisma.categories.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoriesWithIdOnly = await prisma.categories.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends categoriesCreateManyAndReturnArgs>(args?: SelectSubset<T, categoriesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Categories.
     * @param {categoriesDeleteArgs} args - Arguments to delete one Categories.
     * @example
     * // Delete one Categories
     * const Categories = await prisma.categories.delete({
     *   where: {
     *     // ... filter to delete one Categories
     *   }
     * })
     * 
     */
    delete<T extends categoriesDeleteArgs>(args: SelectSubset<T, categoriesDeleteArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Categories.
     * @param {categoriesUpdateArgs} args - Arguments to update one Categories.
     * @example
     * // Update one Categories
     * const categories = await prisma.categories.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends categoriesUpdateArgs>(args: SelectSubset<T, categoriesUpdateArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {categoriesDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.categories.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends categoriesDeleteManyArgs>(args?: SelectSubset<T, categoriesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const categories = await prisma.categories.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends categoriesUpdateManyArgs>(args: SelectSubset<T, categoriesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {categoriesUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const categories = await prisma.categories.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoriesWithIdOnly = await prisma.categories.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends categoriesUpdateManyAndReturnArgs>(args: SelectSubset<T, categoriesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Categories.
     * @param {categoriesUpsertArgs} args - Arguments to update or create a Categories.
     * @example
     * // Update or create a Categories
     * const categories = await prisma.categories.upsert({
     *   create: {
     *     // ... data to create a Categories
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Categories we want to update
     *   }
     * })
     */
    upsert<T extends categoriesUpsertArgs>(args: SelectSubset<T, categoriesUpsertArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.categories.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends categoriesCountArgs>(
      args?: Subset<T, categoriesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoriesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoriesAggregateArgs>(args: Subset<T, CategoriesAggregateArgs>): Prisma.PrismaPromise<GetCategoriesAggregateType<T>>

    /**
     * Group by Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends categoriesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: categoriesGroupByArgs['orderBy'] }
        : { orderBy?: categoriesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, categoriesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoriesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the categories model
   */
  readonly fields: categoriesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for categories.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__categoriesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends categories$usersArgs<ExtArgs> = {}>(args?: Subset<T, categories$usersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    expenses<T extends categories$expensesArgs<ExtArgs> = {}>(args?: Subset<T, categories$expensesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$expensesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the categories model
   */
  interface categoriesFieldRefs {
    readonly id: FieldRef<"categories", 'Int'>
    readonly name: FieldRef<"categories", 'String'>
    readonly budget: FieldRef<"categories", 'Decimal'>
    readonly createdat: FieldRef<"categories", 'DateTime'>
    readonly updatedat: FieldRef<"categories", 'DateTime'>
    readonly userid: FieldRef<"categories", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * categories findUnique
   */
  export type categoriesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where: categoriesWhereUniqueInput
  }

  /**
   * categories findUniqueOrThrow
   */
  export type categoriesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where: categoriesWhereUniqueInput
  }

  /**
   * categories findFirst
   */
  export type categoriesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where?: categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoriesOrderByWithRelationInput | categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categories.
     */
    cursor?: categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categories.
     */
    distinct?: CategoriesScalarFieldEnum | CategoriesScalarFieldEnum[]
  }

  /**
   * categories findFirstOrThrow
   */
  export type categoriesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where?: categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoriesOrderByWithRelationInput | categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categories.
     */
    cursor?: categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categories.
     */
    distinct?: CategoriesScalarFieldEnum | CategoriesScalarFieldEnum[]
  }

  /**
   * categories findMany
   */
  export type categoriesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where?: categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoriesOrderByWithRelationInput | categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing categories.
     */
    cursor?: categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    distinct?: CategoriesScalarFieldEnum | CategoriesScalarFieldEnum[]
  }

  /**
   * categories create
   */
  export type categoriesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * The data needed to create a categories.
     */
    data?: XOR<categoriesCreateInput, categoriesUncheckedCreateInput>
  }

  /**
   * categories createMany
   */
  export type categoriesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many categories.
     */
    data: categoriesCreateManyInput | categoriesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * categories createManyAndReturn
   */
  export type categoriesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * The data used to create many categories.
     */
    data: categoriesCreateManyInput | categoriesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * categories update
   */
  export type categoriesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * The data needed to update a categories.
     */
    data: XOR<categoriesUpdateInput, categoriesUncheckedUpdateInput>
    /**
     * Choose, which categories to update.
     */
    where: categoriesWhereUniqueInput
  }

  /**
   * categories updateMany
   */
  export type categoriesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update categories.
     */
    data: XOR<categoriesUpdateManyMutationInput, categoriesUncheckedUpdateManyInput>
    /**
     * Filter which categories to update
     */
    where?: categoriesWhereInput
    /**
     * Limit how many categories to update.
     */
    limit?: number
  }

  /**
   * categories updateManyAndReturn
   */
  export type categoriesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * The data used to update categories.
     */
    data: XOR<categoriesUpdateManyMutationInput, categoriesUncheckedUpdateManyInput>
    /**
     * Filter which categories to update
     */
    where?: categoriesWhereInput
    /**
     * Limit how many categories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * categories upsert
   */
  export type categoriesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * The filter to search for the categories to update in case it exists.
     */
    where: categoriesWhereUniqueInput
    /**
     * In case the categories found by the `where` argument doesn't exist, create a new categories with this data.
     */
    create: XOR<categoriesCreateInput, categoriesUncheckedCreateInput>
    /**
     * In case the categories was found with the provided `where` argument, update it with this data.
     */
    update: XOR<categoriesUpdateInput, categoriesUncheckedUpdateInput>
  }

  /**
   * categories delete
   */
  export type categoriesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter which categories to delete.
     */
    where: categoriesWhereUniqueInput
  }

  /**
   * categories deleteMany
   */
  export type categoriesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which categories to delete
     */
    where?: categoriesWhereInput
    /**
     * Limit how many categories to delete.
     */
    limit?: number
  }

  /**
   * categories.users
   */
  export type categories$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * categories.expenses
   */
  export type categories$expensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenses
     */
    select?: expensesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expenses
     */
    omit?: expensesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expensesInclude<ExtArgs> | null
    where?: expensesWhereInput
    orderBy?: expensesOrderByWithRelationInput | expensesOrderByWithRelationInput[]
    cursor?: expensesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpensesScalarFieldEnum | ExpensesScalarFieldEnum[]
  }

  /**
   * categories without action
   */
  export type categoriesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
  }


  /**
   * Model expenses
   */

  export type AggregateExpenses = {
    _count: ExpensesCountAggregateOutputType | null
    _avg: ExpensesAvgAggregateOutputType | null
    _sum: ExpensesSumAggregateOutputType | null
    _min: ExpensesMinAggregateOutputType | null
    _max: ExpensesMaxAggregateOutputType | null
  }

  export type ExpensesAvgAggregateOutputType = {
    id: number | null
    amount: Decimal | null
    userid: number | null
    categoryid: number | null
  }

  export type ExpensesSumAggregateOutputType = {
    id: number | null
    amount: Decimal | null
    userid: number | null
    categoryid: number | null
  }

  export type ExpensesMinAggregateOutputType = {
    id: number | null
    amount: Decimal | null
    date: Date | null
    description: string | null
    type: string | null
    receipt: string | null
    createdat: Date | null
    updatedat: Date | null
    userid: number | null
    categoryid: number | null
  }

  export type ExpensesMaxAggregateOutputType = {
    id: number | null
    amount: Decimal | null
    date: Date | null
    description: string | null
    type: string | null
    receipt: string | null
    createdat: Date | null
    updatedat: Date | null
    userid: number | null
    categoryid: number | null
  }

  export type ExpensesCountAggregateOutputType = {
    id: number
    amount: number
    date: number
    description: number
    type: number
    receipt: number
    createdat: number
    updatedat: number
    userid: number
    categoryid: number
    _all: number
  }


  export type ExpensesAvgAggregateInputType = {
    id?: true
    amount?: true
    userid?: true
    categoryid?: true
  }

  export type ExpensesSumAggregateInputType = {
    id?: true
    amount?: true
    userid?: true
    categoryid?: true
  }

  export type ExpensesMinAggregateInputType = {
    id?: true
    amount?: true
    date?: true
    description?: true
    type?: true
    receipt?: true
    createdat?: true
    updatedat?: true
    userid?: true
    categoryid?: true
  }

  export type ExpensesMaxAggregateInputType = {
    id?: true
    amount?: true
    date?: true
    description?: true
    type?: true
    receipt?: true
    createdat?: true
    updatedat?: true
    userid?: true
    categoryid?: true
  }

  export type ExpensesCountAggregateInputType = {
    id?: true
    amount?: true
    date?: true
    description?: true
    type?: true
    receipt?: true
    createdat?: true
    updatedat?: true
    userid?: true
    categoryid?: true
    _all?: true
  }

  export type ExpensesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which expenses to aggregate.
     */
    where?: expensesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of expenses to fetch.
     */
    orderBy?: expensesOrderByWithRelationInput | expensesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: expensesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned expenses
    **/
    _count?: true | ExpensesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExpensesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExpensesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExpensesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExpensesMaxAggregateInputType
  }

  export type GetExpensesAggregateType<T extends ExpensesAggregateArgs> = {
        [P in keyof T & keyof AggregateExpenses]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExpenses[P]>
      : GetScalarType<T[P], AggregateExpenses[P]>
  }




  export type expensesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: expensesWhereInput
    orderBy?: expensesOrderByWithAggregationInput | expensesOrderByWithAggregationInput[]
    by: ExpensesScalarFieldEnum[] | ExpensesScalarFieldEnum
    having?: expensesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExpensesCountAggregateInputType | true
    _avg?: ExpensesAvgAggregateInputType
    _sum?: ExpensesSumAggregateInputType
    _min?: ExpensesMinAggregateInputType
    _max?: ExpensesMaxAggregateInputType
  }

  export type ExpensesGroupByOutputType = {
    id: number
    amount: Decimal | null
    date: Date | null
    description: string | null
    type: string | null
    receipt: string | null
    createdat: Date | null
    updatedat: Date | null
    userid: number | null
    categoryid: number | null
    _count: ExpensesCountAggregateOutputType | null
    _avg: ExpensesAvgAggregateOutputType | null
    _sum: ExpensesSumAggregateOutputType | null
    _min: ExpensesMinAggregateOutputType | null
    _max: ExpensesMaxAggregateOutputType | null
  }

  type GetExpensesGroupByPayload<T extends expensesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExpensesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExpensesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExpensesGroupByOutputType[P]>
            : GetScalarType<T[P], ExpensesGroupByOutputType[P]>
        }
      >
    >


  export type expensesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    date?: boolean
    description?: boolean
    type?: boolean
    receipt?: boolean
    createdat?: boolean
    updatedat?: boolean
    userid?: boolean
    categoryid?: boolean
    categories?: boolean | expenses$categoriesArgs<ExtArgs>
    users?: boolean | expenses$usersArgs<ExtArgs>
  }, ExtArgs["result"]["expenses"]>

  export type expensesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    date?: boolean
    description?: boolean
    type?: boolean
    receipt?: boolean
    createdat?: boolean
    updatedat?: boolean
    userid?: boolean
    categoryid?: boolean
    categories?: boolean | expenses$categoriesArgs<ExtArgs>
    users?: boolean | expenses$usersArgs<ExtArgs>
  }, ExtArgs["result"]["expenses"]>

  export type expensesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    date?: boolean
    description?: boolean
    type?: boolean
    receipt?: boolean
    createdat?: boolean
    updatedat?: boolean
    userid?: boolean
    categoryid?: boolean
    categories?: boolean | expenses$categoriesArgs<ExtArgs>
    users?: boolean | expenses$usersArgs<ExtArgs>
  }, ExtArgs["result"]["expenses"]>

  export type expensesSelectScalar = {
    id?: boolean
    amount?: boolean
    date?: boolean
    description?: boolean
    type?: boolean
    receipt?: boolean
    createdat?: boolean
    updatedat?: boolean
    userid?: boolean
    categoryid?: boolean
  }

  export type expensesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "amount" | "date" | "description" | "type" | "receipt" | "createdat" | "updatedat" | "userid" | "categoryid", ExtArgs["result"]["expenses"]>
  export type expensesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categories?: boolean | expenses$categoriesArgs<ExtArgs>
    users?: boolean | expenses$usersArgs<ExtArgs>
  }
  export type expensesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categories?: boolean | expenses$categoriesArgs<ExtArgs>
    users?: boolean | expenses$usersArgs<ExtArgs>
  }
  export type expensesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categories?: boolean | expenses$categoriesArgs<ExtArgs>
    users?: boolean | expenses$usersArgs<ExtArgs>
  }

  export type $expensesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "expenses"
    objects: {
      categories: Prisma.$categoriesPayload<ExtArgs> | null
      users: Prisma.$usersPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      amount: Prisma.Decimal | null
      date: Date | null
      description: string | null
      type: string | null
      receipt: string | null
      createdat: Date | null
      updatedat: Date | null
      userid: number | null
      categoryid: number | null
    }, ExtArgs["result"]["expenses"]>
    composites: {}
  }

  type expensesGetPayload<S extends boolean | null | undefined | expensesDefaultArgs> = $Result.GetResult<Prisma.$expensesPayload, S>

  type expensesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<expensesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExpensesCountAggregateInputType | true
    }

  export interface expensesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['expenses'], meta: { name: 'expenses' } }
    /**
     * Find zero or one Expenses that matches the filter.
     * @param {expensesFindUniqueArgs} args - Arguments to find a Expenses
     * @example
     * // Get one Expenses
     * const expenses = await prisma.expenses.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends expensesFindUniqueArgs>(args: SelectSubset<T, expensesFindUniqueArgs<ExtArgs>>): Prisma__expensesClient<$Result.GetResult<Prisma.$expensesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Expenses that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {expensesFindUniqueOrThrowArgs} args - Arguments to find a Expenses
     * @example
     * // Get one Expenses
     * const expenses = await prisma.expenses.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends expensesFindUniqueOrThrowArgs>(args: SelectSubset<T, expensesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__expensesClient<$Result.GetResult<Prisma.$expensesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Expenses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {expensesFindFirstArgs} args - Arguments to find a Expenses
     * @example
     * // Get one Expenses
     * const expenses = await prisma.expenses.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends expensesFindFirstArgs>(args?: SelectSubset<T, expensesFindFirstArgs<ExtArgs>>): Prisma__expensesClient<$Result.GetResult<Prisma.$expensesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Expenses that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {expensesFindFirstOrThrowArgs} args - Arguments to find a Expenses
     * @example
     * // Get one Expenses
     * const expenses = await prisma.expenses.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends expensesFindFirstOrThrowArgs>(args?: SelectSubset<T, expensesFindFirstOrThrowArgs<ExtArgs>>): Prisma__expensesClient<$Result.GetResult<Prisma.$expensesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Expenses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {expensesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Expenses
     * const expenses = await prisma.expenses.findMany()
     * 
     * // Get first 10 Expenses
     * const expenses = await prisma.expenses.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const expensesWithIdOnly = await prisma.expenses.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends expensesFindManyArgs>(args?: SelectSubset<T, expensesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$expensesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Expenses.
     * @param {expensesCreateArgs} args - Arguments to create a Expenses.
     * @example
     * // Create one Expenses
     * const Expenses = await prisma.expenses.create({
     *   data: {
     *     // ... data to create a Expenses
     *   }
     * })
     * 
     */
    create<T extends expensesCreateArgs>(args: SelectSubset<T, expensesCreateArgs<ExtArgs>>): Prisma__expensesClient<$Result.GetResult<Prisma.$expensesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Expenses.
     * @param {expensesCreateManyArgs} args - Arguments to create many Expenses.
     * @example
     * // Create many Expenses
     * const expenses = await prisma.expenses.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends expensesCreateManyArgs>(args?: SelectSubset<T, expensesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Expenses and returns the data saved in the database.
     * @param {expensesCreateManyAndReturnArgs} args - Arguments to create many Expenses.
     * @example
     * // Create many Expenses
     * const expenses = await prisma.expenses.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Expenses and only return the `id`
     * const expensesWithIdOnly = await prisma.expenses.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends expensesCreateManyAndReturnArgs>(args?: SelectSubset<T, expensesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$expensesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Expenses.
     * @param {expensesDeleteArgs} args - Arguments to delete one Expenses.
     * @example
     * // Delete one Expenses
     * const Expenses = await prisma.expenses.delete({
     *   where: {
     *     // ... filter to delete one Expenses
     *   }
     * })
     * 
     */
    delete<T extends expensesDeleteArgs>(args: SelectSubset<T, expensesDeleteArgs<ExtArgs>>): Prisma__expensesClient<$Result.GetResult<Prisma.$expensesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Expenses.
     * @param {expensesUpdateArgs} args - Arguments to update one Expenses.
     * @example
     * // Update one Expenses
     * const expenses = await prisma.expenses.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends expensesUpdateArgs>(args: SelectSubset<T, expensesUpdateArgs<ExtArgs>>): Prisma__expensesClient<$Result.GetResult<Prisma.$expensesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Expenses.
     * @param {expensesDeleteManyArgs} args - Arguments to filter Expenses to delete.
     * @example
     * // Delete a few Expenses
     * const { count } = await prisma.expenses.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends expensesDeleteManyArgs>(args?: SelectSubset<T, expensesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {expensesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Expenses
     * const expenses = await prisma.expenses.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends expensesUpdateManyArgs>(args: SelectSubset<T, expensesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Expenses and returns the data updated in the database.
     * @param {expensesUpdateManyAndReturnArgs} args - Arguments to update many Expenses.
     * @example
     * // Update many Expenses
     * const expenses = await prisma.expenses.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Expenses and only return the `id`
     * const expensesWithIdOnly = await prisma.expenses.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends expensesUpdateManyAndReturnArgs>(args: SelectSubset<T, expensesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$expensesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Expenses.
     * @param {expensesUpsertArgs} args - Arguments to update or create a Expenses.
     * @example
     * // Update or create a Expenses
     * const expenses = await prisma.expenses.upsert({
     *   create: {
     *     // ... data to create a Expenses
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Expenses we want to update
     *   }
     * })
     */
    upsert<T extends expensesUpsertArgs>(args: SelectSubset<T, expensesUpsertArgs<ExtArgs>>): Prisma__expensesClient<$Result.GetResult<Prisma.$expensesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {expensesCountArgs} args - Arguments to filter Expenses to count.
     * @example
     * // Count the number of Expenses
     * const count = await prisma.expenses.count({
     *   where: {
     *     // ... the filter for the Expenses we want to count
     *   }
     * })
    **/
    count<T extends expensesCountArgs>(
      args?: Subset<T, expensesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExpensesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpensesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExpensesAggregateArgs>(args: Subset<T, ExpensesAggregateArgs>): Prisma.PrismaPromise<GetExpensesAggregateType<T>>

    /**
     * Group by Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {expensesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends expensesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: expensesGroupByArgs['orderBy'] }
        : { orderBy?: expensesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, expensesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpensesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the expenses model
   */
  readonly fields: expensesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for expenses.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__expensesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    categories<T extends expenses$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, expenses$categoriesArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    users<T extends expenses$usersArgs<ExtArgs> = {}>(args?: Subset<T, expenses$usersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the expenses model
   */
  interface expensesFieldRefs {
    readonly id: FieldRef<"expenses", 'Int'>
    readonly amount: FieldRef<"expenses", 'Decimal'>
    readonly date: FieldRef<"expenses", 'DateTime'>
    readonly description: FieldRef<"expenses", 'String'>
    readonly type: FieldRef<"expenses", 'String'>
    readonly receipt: FieldRef<"expenses", 'String'>
    readonly createdat: FieldRef<"expenses", 'DateTime'>
    readonly updatedat: FieldRef<"expenses", 'DateTime'>
    readonly userid: FieldRef<"expenses", 'Int'>
    readonly categoryid: FieldRef<"expenses", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * expenses findUnique
   */
  export type expensesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenses
     */
    select?: expensesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expenses
     */
    omit?: expensesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expensesInclude<ExtArgs> | null
    /**
     * Filter, which expenses to fetch.
     */
    where: expensesWhereUniqueInput
  }

  /**
   * expenses findUniqueOrThrow
   */
  export type expensesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenses
     */
    select?: expensesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expenses
     */
    omit?: expensesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expensesInclude<ExtArgs> | null
    /**
     * Filter, which expenses to fetch.
     */
    where: expensesWhereUniqueInput
  }

  /**
   * expenses findFirst
   */
  export type expensesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenses
     */
    select?: expensesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expenses
     */
    omit?: expensesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expensesInclude<ExtArgs> | null
    /**
     * Filter, which expenses to fetch.
     */
    where?: expensesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of expenses to fetch.
     */
    orderBy?: expensesOrderByWithRelationInput | expensesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for expenses.
     */
    cursor?: expensesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of expenses.
     */
    distinct?: ExpensesScalarFieldEnum | ExpensesScalarFieldEnum[]
  }

  /**
   * expenses findFirstOrThrow
   */
  export type expensesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenses
     */
    select?: expensesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expenses
     */
    omit?: expensesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expensesInclude<ExtArgs> | null
    /**
     * Filter, which expenses to fetch.
     */
    where?: expensesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of expenses to fetch.
     */
    orderBy?: expensesOrderByWithRelationInput | expensesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for expenses.
     */
    cursor?: expensesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of expenses.
     */
    distinct?: ExpensesScalarFieldEnum | ExpensesScalarFieldEnum[]
  }

  /**
   * expenses findMany
   */
  export type expensesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenses
     */
    select?: expensesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expenses
     */
    omit?: expensesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expensesInclude<ExtArgs> | null
    /**
     * Filter, which expenses to fetch.
     */
    where?: expensesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of expenses to fetch.
     */
    orderBy?: expensesOrderByWithRelationInput | expensesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing expenses.
     */
    cursor?: expensesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` expenses.
     */
    skip?: number
    distinct?: ExpensesScalarFieldEnum | ExpensesScalarFieldEnum[]
  }

  /**
   * expenses create
   */
  export type expensesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenses
     */
    select?: expensesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expenses
     */
    omit?: expensesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expensesInclude<ExtArgs> | null
    /**
     * The data needed to create a expenses.
     */
    data?: XOR<expensesCreateInput, expensesUncheckedCreateInput>
  }

  /**
   * expenses createMany
   */
  export type expensesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many expenses.
     */
    data: expensesCreateManyInput | expensesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * expenses createManyAndReturn
   */
  export type expensesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenses
     */
    select?: expensesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the expenses
     */
    omit?: expensesOmit<ExtArgs> | null
    /**
     * The data used to create many expenses.
     */
    data: expensesCreateManyInput | expensesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expensesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * expenses update
   */
  export type expensesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenses
     */
    select?: expensesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expenses
     */
    omit?: expensesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expensesInclude<ExtArgs> | null
    /**
     * The data needed to update a expenses.
     */
    data: XOR<expensesUpdateInput, expensesUncheckedUpdateInput>
    /**
     * Choose, which expenses to update.
     */
    where: expensesWhereUniqueInput
  }

  /**
   * expenses updateMany
   */
  export type expensesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update expenses.
     */
    data: XOR<expensesUpdateManyMutationInput, expensesUncheckedUpdateManyInput>
    /**
     * Filter which expenses to update
     */
    where?: expensesWhereInput
    /**
     * Limit how many expenses to update.
     */
    limit?: number
  }

  /**
   * expenses updateManyAndReturn
   */
  export type expensesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenses
     */
    select?: expensesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the expenses
     */
    omit?: expensesOmit<ExtArgs> | null
    /**
     * The data used to update expenses.
     */
    data: XOR<expensesUpdateManyMutationInput, expensesUncheckedUpdateManyInput>
    /**
     * Filter which expenses to update
     */
    where?: expensesWhereInput
    /**
     * Limit how many expenses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expensesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * expenses upsert
   */
  export type expensesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenses
     */
    select?: expensesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expenses
     */
    omit?: expensesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expensesInclude<ExtArgs> | null
    /**
     * The filter to search for the expenses to update in case it exists.
     */
    where: expensesWhereUniqueInput
    /**
     * In case the expenses found by the `where` argument doesn't exist, create a new expenses with this data.
     */
    create: XOR<expensesCreateInput, expensesUncheckedCreateInput>
    /**
     * In case the expenses was found with the provided `where` argument, update it with this data.
     */
    update: XOR<expensesUpdateInput, expensesUncheckedUpdateInput>
  }

  /**
   * expenses delete
   */
  export type expensesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenses
     */
    select?: expensesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expenses
     */
    omit?: expensesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expensesInclude<ExtArgs> | null
    /**
     * Filter which expenses to delete.
     */
    where: expensesWhereUniqueInput
  }

  /**
   * expenses deleteMany
   */
  export type expensesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which expenses to delete
     */
    where?: expensesWhereInput
    /**
     * Limit how many expenses to delete.
     */
    limit?: number
  }

  /**
   * expenses.categories
   */
  export type expenses$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    where?: categoriesWhereInput
  }

  /**
   * expenses.users
   */
  export type expenses$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * expenses without action
   */
  export type expensesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenses
     */
    select?: expensesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expenses
     */
    omit?: expensesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expensesInclude<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    id: number | null
  }

  export type UsersSumAggregateOutputType = {
    id: number | null
  }

  export type UsersMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    createdAt: Date | null
    username: string | null
    updatedAt: Date | null
    profile: string | null
  }

  export type UsersMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    createdAt: Date | null
    username: string | null
    updatedAt: Date | null
    profile: string | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    email: number
    password: number
    createdAt: number
    username: number
    updatedAt: number
    profile: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    id?: true
  }

  export type UsersSumAggregateInputType = {
    id?: true
  }

  export type UsersMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    createdAt?: true
    username?: true
    updatedAt?: true
    profile?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    createdAt?: true
    username?: true
    updatedAt?: true
    profile?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    createdAt?: true
    username?: true
    updatedAt?: true
    profile?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: number
    email: string
    password: string
    createdAt: Date | null
    username: string | null
    updatedAt: Date | null
    profile: string | null
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    username?: boolean
    updatedAt?: boolean
    profile?: boolean
    categories?: boolean | users$categoriesArgs<ExtArgs>
    expenses?: boolean | users$expensesArgs<ExtArgs>
    incomes?: boolean | users$incomesArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    username?: boolean
    updatedAt?: boolean
    profile?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    username?: boolean
    updatedAt?: boolean
    profile?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    username?: boolean
    updatedAt?: boolean
    profile?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "createdAt" | "username" | "updatedAt" | "profile", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categories?: boolean | users$categoriesArgs<ExtArgs>
    expenses?: boolean | users$expensesArgs<ExtArgs>
    incomes?: boolean | users$incomesArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      categories: Prisma.$categoriesPayload<ExtArgs>[]
      expenses: Prisma.$expensesPayload<ExtArgs>[]
      incomes: Prisma.$incomesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password: string
      createdAt: Date | null
      username: string | null
      updatedAt: Date | null
      profile: string | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    categories<T extends users$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, users$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    expenses<T extends users$expensesArgs<ExtArgs> = {}>(args?: Subset<T, users$expensesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$expensesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    incomes<T extends users$incomesArgs<ExtArgs> = {}>(args?: Subset<T, users$incomesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$incomesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'Int'>
    readonly email: FieldRef<"users", 'String'>
    readonly password: FieldRef<"users", 'String'>
    readonly createdAt: FieldRef<"users", 'DateTime'>
    readonly username: FieldRef<"users", 'String'>
    readonly updatedAt: FieldRef<"users", 'DateTime'>
    readonly profile: FieldRef<"users", 'String'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.categories
   */
  export type users$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    where?: categoriesWhereInput
    orderBy?: categoriesOrderByWithRelationInput | categoriesOrderByWithRelationInput[]
    cursor?: categoriesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoriesScalarFieldEnum | CategoriesScalarFieldEnum[]
  }

  /**
   * users.expenses
   */
  export type users$expensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenses
     */
    select?: expensesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expenses
     */
    omit?: expensesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expensesInclude<ExtArgs> | null
    where?: expensesWhereInput
    orderBy?: expensesOrderByWithRelationInput | expensesOrderByWithRelationInput[]
    cursor?: expensesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpensesScalarFieldEnum | ExpensesScalarFieldEnum[]
  }

  /**
   * users.incomes
   */
  export type users$incomesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incomes
     */
    select?: incomesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the incomes
     */
    omit?: incomesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: incomesInclude<ExtArgs> | null
    where?: incomesWhereInput
    orderBy?: incomesOrderByWithRelationInput | incomesOrderByWithRelationInput[]
    cursor?: incomesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IncomesScalarFieldEnum | IncomesScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Model incomes
   */

  export type AggregateIncomes = {
    _count: IncomesCountAggregateOutputType | null
    _avg: IncomesAvgAggregateOutputType | null
    _sum: IncomesSumAggregateOutputType | null
    _min: IncomesMinAggregateOutputType | null
    _max: IncomesMaxAggregateOutputType | null
  }

  export type IncomesAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    amount: Decimal | null
  }

  export type IncomesSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    amount: Decimal | null
  }

  export type IncomesMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    amount: Decimal | null
    date: Date | null
    source: string | null
    description: string | null
    created_at: Date | null
  }

  export type IncomesMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    amount: Decimal | null
    date: Date | null
    source: string | null
    description: string | null
    created_at: Date | null
  }

  export type IncomesCountAggregateOutputType = {
    id: number
    user_id: number
    amount: number
    date: number
    source: number
    description: number
    created_at: number
    _all: number
  }


  export type IncomesAvgAggregateInputType = {
    id?: true
    user_id?: true
    amount?: true
  }

  export type IncomesSumAggregateInputType = {
    id?: true
    user_id?: true
    amount?: true
  }

  export type IncomesMinAggregateInputType = {
    id?: true
    user_id?: true
    amount?: true
    date?: true
    source?: true
    description?: true
    created_at?: true
  }

  export type IncomesMaxAggregateInputType = {
    id?: true
    user_id?: true
    amount?: true
    date?: true
    source?: true
    description?: true
    created_at?: true
  }

  export type IncomesCountAggregateInputType = {
    id?: true
    user_id?: true
    amount?: true
    date?: true
    source?: true
    description?: true
    created_at?: true
    _all?: true
  }

  export type IncomesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which incomes to aggregate.
     */
    where?: incomesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of incomes to fetch.
     */
    orderBy?: incomesOrderByWithRelationInput | incomesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: incomesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` incomes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` incomes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned incomes
    **/
    _count?: true | IncomesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: IncomesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: IncomesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IncomesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IncomesMaxAggregateInputType
  }

  export type GetIncomesAggregateType<T extends IncomesAggregateArgs> = {
        [P in keyof T & keyof AggregateIncomes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIncomes[P]>
      : GetScalarType<T[P], AggregateIncomes[P]>
  }




  export type incomesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: incomesWhereInput
    orderBy?: incomesOrderByWithAggregationInput | incomesOrderByWithAggregationInput[]
    by: IncomesScalarFieldEnum[] | IncomesScalarFieldEnum
    having?: incomesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IncomesCountAggregateInputType | true
    _avg?: IncomesAvgAggregateInputType
    _sum?: IncomesSumAggregateInputType
    _min?: IncomesMinAggregateInputType
    _max?: IncomesMaxAggregateInputType
  }

  export type IncomesGroupByOutputType = {
    id: number
    user_id: number
    amount: Decimal
    date: Date
    source: string
    description: string | null
    created_at: Date | null
    _count: IncomesCountAggregateOutputType | null
    _avg: IncomesAvgAggregateOutputType | null
    _sum: IncomesSumAggregateOutputType | null
    _min: IncomesMinAggregateOutputType | null
    _max: IncomesMaxAggregateOutputType | null
  }

  type GetIncomesGroupByPayload<T extends incomesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IncomesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IncomesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IncomesGroupByOutputType[P]>
            : GetScalarType<T[P], IncomesGroupByOutputType[P]>
        }
      >
    >


  export type incomesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    amount?: boolean
    date?: boolean
    source?: boolean
    description?: boolean
    created_at?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["incomes"]>

  export type incomesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    amount?: boolean
    date?: boolean
    source?: boolean
    description?: boolean
    created_at?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["incomes"]>

  export type incomesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    amount?: boolean
    date?: boolean
    source?: boolean
    description?: boolean
    created_at?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["incomes"]>

  export type incomesSelectScalar = {
    id?: boolean
    user_id?: boolean
    amount?: boolean
    date?: boolean
    source?: boolean
    description?: boolean
    created_at?: boolean
  }

  export type incomesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "amount" | "date" | "source" | "description" | "created_at", ExtArgs["result"]["incomes"]>
  export type incomesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type incomesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type incomesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $incomesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "incomes"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      amount: Prisma.Decimal
      date: Date
      source: string
      description: string | null
      created_at: Date | null
    }, ExtArgs["result"]["incomes"]>
    composites: {}
  }

  type incomesGetPayload<S extends boolean | null | undefined | incomesDefaultArgs> = $Result.GetResult<Prisma.$incomesPayload, S>

  type incomesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<incomesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IncomesCountAggregateInputType | true
    }

  export interface incomesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['incomes'], meta: { name: 'incomes' } }
    /**
     * Find zero or one Incomes that matches the filter.
     * @param {incomesFindUniqueArgs} args - Arguments to find a Incomes
     * @example
     * // Get one Incomes
     * const incomes = await prisma.incomes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends incomesFindUniqueArgs>(args: SelectSubset<T, incomesFindUniqueArgs<ExtArgs>>): Prisma__incomesClient<$Result.GetResult<Prisma.$incomesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Incomes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {incomesFindUniqueOrThrowArgs} args - Arguments to find a Incomes
     * @example
     * // Get one Incomes
     * const incomes = await prisma.incomes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends incomesFindUniqueOrThrowArgs>(args: SelectSubset<T, incomesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__incomesClient<$Result.GetResult<Prisma.$incomesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Incomes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {incomesFindFirstArgs} args - Arguments to find a Incomes
     * @example
     * // Get one Incomes
     * const incomes = await prisma.incomes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends incomesFindFirstArgs>(args?: SelectSubset<T, incomesFindFirstArgs<ExtArgs>>): Prisma__incomesClient<$Result.GetResult<Prisma.$incomesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Incomes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {incomesFindFirstOrThrowArgs} args - Arguments to find a Incomes
     * @example
     * // Get one Incomes
     * const incomes = await prisma.incomes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends incomesFindFirstOrThrowArgs>(args?: SelectSubset<T, incomesFindFirstOrThrowArgs<ExtArgs>>): Prisma__incomesClient<$Result.GetResult<Prisma.$incomesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Incomes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {incomesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Incomes
     * const incomes = await prisma.incomes.findMany()
     * 
     * // Get first 10 Incomes
     * const incomes = await prisma.incomes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const incomesWithIdOnly = await prisma.incomes.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends incomesFindManyArgs>(args?: SelectSubset<T, incomesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$incomesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Incomes.
     * @param {incomesCreateArgs} args - Arguments to create a Incomes.
     * @example
     * // Create one Incomes
     * const Incomes = await prisma.incomes.create({
     *   data: {
     *     // ... data to create a Incomes
     *   }
     * })
     * 
     */
    create<T extends incomesCreateArgs>(args: SelectSubset<T, incomesCreateArgs<ExtArgs>>): Prisma__incomesClient<$Result.GetResult<Prisma.$incomesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Incomes.
     * @param {incomesCreateManyArgs} args - Arguments to create many Incomes.
     * @example
     * // Create many Incomes
     * const incomes = await prisma.incomes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends incomesCreateManyArgs>(args?: SelectSubset<T, incomesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Incomes and returns the data saved in the database.
     * @param {incomesCreateManyAndReturnArgs} args - Arguments to create many Incomes.
     * @example
     * // Create many Incomes
     * const incomes = await prisma.incomes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Incomes and only return the `id`
     * const incomesWithIdOnly = await prisma.incomes.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends incomesCreateManyAndReturnArgs>(args?: SelectSubset<T, incomesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$incomesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Incomes.
     * @param {incomesDeleteArgs} args - Arguments to delete one Incomes.
     * @example
     * // Delete one Incomes
     * const Incomes = await prisma.incomes.delete({
     *   where: {
     *     // ... filter to delete one Incomes
     *   }
     * })
     * 
     */
    delete<T extends incomesDeleteArgs>(args: SelectSubset<T, incomesDeleteArgs<ExtArgs>>): Prisma__incomesClient<$Result.GetResult<Prisma.$incomesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Incomes.
     * @param {incomesUpdateArgs} args - Arguments to update one Incomes.
     * @example
     * // Update one Incomes
     * const incomes = await prisma.incomes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends incomesUpdateArgs>(args: SelectSubset<T, incomesUpdateArgs<ExtArgs>>): Prisma__incomesClient<$Result.GetResult<Prisma.$incomesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Incomes.
     * @param {incomesDeleteManyArgs} args - Arguments to filter Incomes to delete.
     * @example
     * // Delete a few Incomes
     * const { count } = await prisma.incomes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends incomesDeleteManyArgs>(args?: SelectSubset<T, incomesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Incomes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {incomesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Incomes
     * const incomes = await prisma.incomes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends incomesUpdateManyArgs>(args: SelectSubset<T, incomesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Incomes and returns the data updated in the database.
     * @param {incomesUpdateManyAndReturnArgs} args - Arguments to update many Incomes.
     * @example
     * // Update many Incomes
     * const incomes = await prisma.incomes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Incomes and only return the `id`
     * const incomesWithIdOnly = await prisma.incomes.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends incomesUpdateManyAndReturnArgs>(args: SelectSubset<T, incomesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$incomesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Incomes.
     * @param {incomesUpsertArgs} args - Arguments to update or create a Incomes.
     * @example
     * // Update or create a Incomes
     * const incomes = await prisma.incomes.upsert({
     *   create: {
     *     // ... data to create a Incomes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Incomes we want to update
     *   }
     * })
     */
    upsert<T extends incomesUpsertArgs>(args: SelectSubset<T, incomesUpsertArgs<ExtArgs>>): Prisma__incomesClient<$Result.GetResult<Prisma.$incomesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Incomes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {incomesCountArgs} args - Arguments to filter Incomes to count.
     * @example
     * // Count the number of Incomes
     * const count = await prisma.incomes.count({
     *   where: {
     *     // ... the filter for the Incomes we want to count
     *   }
     * })
    **/
    count<T extends incomesCountArgs>(
      args?: Subset<T, incomesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IncomesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Incomes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IncomesAggregateArgs>(args: Subset<T, IncomesAggregateArgs>): Prisma.PrismaPromise<GetIncomesAggregateType<T>>

    /**
     * Group by Incomes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {incomesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends incomesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: incomesGroupByArgs['orderBy'] }
        : { orderBy?: incomesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, incomesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIncomesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the incomes model
   */
  readonly fields: incomesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for incomes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__incomesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the incomes model
   */
  interface incomesFieldRefs {
    readonly id: FieldRef<"incomes", 'Int'>
    readonly user_id: FieldRef<"incomes", 'Int'>
    readonly amount: FieldRef<"incomes", 'Decimal'>
    readonly date: FieldRef<"incomes", 'DateTime'>
    readonly source: FieldRef<"incomes", 'String'>
    readonly description: FieldRef<"incomes", 'String'>
    readonly created_at: FieldRef<"incomes", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * incomes findUnique
   */
  export type incomesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incomes
     */
    select?: incomesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the incomes
     */
    omit?: incomesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: incomesInclude<ExtArgs> | null
    /**
     * Filter, which incomes to fetch.
     */
    where: incomesWhereUniqueInput
  }

  /**
   * incomes findUniqueOrThrow
   */
  export type incomesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incomes
     */
    select?: incomesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the incomes
     */
    omit?: incomesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: incomesInclude<ExtArgs> | null
    /**
     * Filter, which incomes to fetch.
     */
    where: incomesWhereUniqueInput
  }

  /**
   * incomes findFirst
   */
  export type incomesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incomes
     */
    select?: incomesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the incomes
     */
    omit?: incomesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: incomesInclude<ExtArgs> | null
    /**
     * Filter, which incomes to fetch.
     */
    where?: incomesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of incomes to fetch.
     */
    orderBy?: incomesOrderByWithRelationInput | incomesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for incomes.
     */
    cursor?: incomesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` incomes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` incomes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of incomes.
     */
    distinct?: IncomesScalarFieldEnum | IncomesScalarFieldEnum[]
  }

  /**
   * incomes findFirstOrThrow
   */
  export type incomesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incomes
     */
    select?: incomesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the incomes
     */
    omit?: incomesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: incomesInclude<ExtArgs> | null
    /**
     * Filter, which incomes to fetch.
     */
    where?: incomesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of incomes to fetch.
     */
    orderBy?: incomesOrderByWithRelationInput | incomesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for incomes.
     */
    cursor?: incomesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` incomes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` incomes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of incomes.
     */
    distinct?: IncomesScalarFieldEnum | IncomesScalarFieldEnum[]
  }

  /**
   * incomes findMany
   */
  export type incomesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incomes
     */
    select?: incomesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the incomes
     */
    omit?: incomesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: incomesInclude<ExtArgs> | null
    /**
     * Filter, which incomes to fetch.
     */
    where?: incomesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of incomes to fetch.
     */
    orderBy?: incomesOrderByWithRelationInput | incomesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing incomes.
     */
    cursor?: incomesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` incomes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` incomes.
     */
    skip?: number
    distinct?: IncomesScalarFieldEnum | IncomesScalarFieldEnum[]
  }

  /**
   * incomes create
   */
  export type incomesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incomes
     */
    select?: incomesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the incomes
     */
    omit?: incomesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: incomesInclude<ExtArgs> | null
    /**
     * The data needed to create a incomes.
     */
    data: XOR<incomesCreateInput, incomesUncheckedCreateInput>
  }

  /**
   * incomes createMany
   */
  export type incomesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many incomes.
     */
    data: incomesCreateManyInput | incomesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * incomes createManyAndReturn
   */
  export type incomesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incomes
     */
    select?: incomesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the incomes
     */
    omit?: incomesOmit<ExtArgs> | null
    /**
     * The data used to create many incomes.
     */
    data: incomesCreateManyInput | incomesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: incomesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * incomes update
   */
  export type incomesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incomes
     */
    select?: incomesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the incomes
     */
    omit?: incomesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: incomesInclude<ExtArgs> | null
    /**
     * The data needed to update a incomes.
     */
    data: XOR<incomesUpdateInput, incomesUncheckedUpdateInput>
    /**
     * Choose, which incomes to update.
     */
    where: incomesWhereUniqueInput
  }

  /**
   * incomes updateMany
   */
  export type incomesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update incomes.
     */
    data: XOR<incomesUpdateManyMutationInput, incomesUncheckedUpdateManyInput>
    /**
     * Filter which incomes to update
     */
    where?: incomesWhereInput
    /**
     * Limit how many incomes to update.
     */
    limit?: number
  }

  /**
   * incomes updateManyAndReturn
   */
  export type incomesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incomes
     */
    select?: incomesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the incomes
     */
    omit?: incomesOmit<ExtArgs> | null
    /**
     * The data used to update incomes.
     */
    data: XOR<incomesUpdateManyMutationInput, incomesUncheckedUpdateManyInput>
    /**
     * Filter which incomes to update
     */
    where?: incomesWhereInput
    /**
     * Limit how many incomes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: incomesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * incomes upsert
   */
  export type incomesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incomes
     */
    select?: incomesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the incomes
     */
    omit?: incomesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: incomesInclude<ExtArgs> | null
    /**
     * The filter to search for the incomes to update in case it exists.
     */
    where: incomesWhereUniqueInput
    /**
     * In case the incomes found by the `where` argument doesn't exist, create a new incomes with this data.
     */
    create: XOR<incomesCreateInput, incomesUncheckedCreateInput>
    /**
     * In case the incomes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<incomesUpdateInput, incomesUncheckedUpdateInput>
  }

  /**
   * incomes delete
   */
  export type incomesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incomes
     */
    select?: incomesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the incomes
     */
    omit?: incomesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: incomesInclude<ExtArgs> | null
    /**
     * Filter which incomes to delete.
     */
    where: incomesWhereUniqueInput
  }

  /**
   * incomes deleteMany
   */
  export type incomesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which incomes to delete
     */
    where?: incomesWhereInput
    /**
     * Limit how many incomes to delete.
     */
    limit?: number
  }

  /**
   * incomes without action
   */
  export type incomesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the incomes
     */
    select?: incomesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the incomes
     */
    omit?: incomesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: incomesInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CategoriesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    budget: 'budget',
    createdat: 'createdat',
    updatedat: 'updatedat',
    userid: 'userid'
  };

  export type CategoriesScalarFieldEnum = (typeof CategoriesScalarFieldEnum)[keyof typeof CategoriesScalarFieldEnum]


  export const ExpensesScalarFieldEnum: {
    id: 'id',
    amount: 'amount',
    date: 'date',
    description: 'description',
    type: 'type',
    receipt: 'receipt',
    createdat: 'createdat',
    updatedat: 'updatedat',
    userid: 'userid',
    categoryid: 'categoryid'
  };

  export type ExpensesScalarFieldEnum = (typeof ExpensesScalarFieldEnum)[keyof typeof ExpensesScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    createdAt: 'createdAt',
    username: 'username',
    updatedAt: 'updatedAt',
    profile: 'profile'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const IncomesScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    amount: 'amount',
    date: 'date',
    source: 'source',
    description: 'description',
    created_at: 'created_at'
  };

  export type IncomesScalarFieldEnum = (typeof IncomesScalarFieldEnum)[keyof typeof IncomesScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type categoriesWhereInput = {
    AND?: categoriesWhereInput | categoriesWhereInput[]
    OR?: categoriesWhereInput[]
    NOT?: categoriesWhereInput | categoriesWhereInput[]
    id?: IntFilter<"categories"> | number
    name?: StringNullableFilter<"categories"> | string | null
    budget?: DecimalNullableFilter<"categories"> | Decimal | DecimalJsLike | number | string | null
    createdat?: DateTimeNullableFilter<"categories"> | Date | string | null
    updatedat?: DateTimeNullableFilter<"categories"> | Date | string | null
    userid?: IntNullableFilter<"categories"> | number | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    expenses?: ExpensesListRelationFilter
  }

  export type categoriesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    budget?: SortOrderInput | SortOrder
    createdat?: SortOrderInput | SortOrder
    updatedat?: SortOrderInput | SortOrder
    userid?: SortOrderInput | SortOrder
    users?: usersOrderByWithRelationInput
    expenses?: expensesOrderByRelationAggregateInput
  }

  export type categoriesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: categoriesWhereInput | categoriesWhereInput[]
    OR?: categoriesWhereInput[]
    NOT?: categoriesWhereInput | categoriesWhereInput[]
    name?: StringNullableFilter<"categories"> | string | null
    budget?: DecimalNullableFilter<"categories"> | Decimal | DecimalJsLike | number | string | null
    createdat?: DateTimeNullableFilter<"categories"> | Date | string | null
    updatedat?: DateTimeNullableFilter<"categories"> | Date | string | null
    userid?: IntNullableFilter<"categories"> | number | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    expenses?: ExpensesListRelationFilter
  }, "id">

  export type categoriesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    budget?: SortOrderInput | SortOrder
    createdat?: SortOrderInput | SortOrder
    updatedat?: SortOrderInput | SortOrder
    userid?: SortOrderInput | SortOrder
    _count?: categoriesCountOrderByAggregateInput
    _avg?: categoriesAvgOrderByAggregateInput
    _max?: categoriesMaxOrderByAggregateInput
    _min?: categoriesMinOrderByAggregateInput
    _sum?: categoriesSumOrderByAggregateInput
  }

  export type categoriesScalarWhereWithAggregatesInput = {
    AND?: categoriesScalarWhereWithAggregatesInput | categoriesScalarWhereWithAggregatesInput[]
    OR?: categoriesScalarWhereWithAggregatesInput[]
    NOT?: categoriesScalarWhereWithAggregatesInput | categoriesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"categories"> | number
    name?: StringNullableWithAggregatesFilter<"categories"> | string | null
    budget?: DecimalNullableWithAggregatesFilter<"categories"> | Decimal | DecimalJsLike | number | string | null
    createdat?: DateTimeNullableWithAggregatesFilter<"categories"> | Date | string | null
    updatedat?: DateTimeNullableWithAggregatesFilter<"categories"> | Date | string | null
    userid?: IntNullableWithAggregatesFilter<"categories"> | number | null
  }

  export type expensesWhereInput = {
    AND?: expensesWhereInput | expensesWhereInput[]
    OR?: expensesWhereInput[]
    NOT?: expensesWhereInput | expensesWhereInput[]
    id?: IntFilter<"expenses"> | number
    amount?: DecimalNullableFilter<"expenses"> | Decimal | DecimalJsLike | number | string | null
    date?: DateTimeNullableFilter<"expenses"> | Date | string | null
    description?: StringNullableFilter<"expenses"> | string | null
    type?: StringNullableFilter<"expenses"> | string | null
    receipt?: StringNullableFilter<"expenses"> | string | null
    createdat?: DateTimeNullableFilter<"expenses"> | Date | string | null
    updatedat?: DateTimeNullableFilter<"expenses"> | Date | string | null
    userid?: IntNullableFilter<"expenses"> | number | null
    categoryid?: IntNullableFilter<"expenses"> | number | null
    categories?: XOR<CategoriesNullableScalarRelationFilter, categoriesWhereInput> | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }

  export type expensesOrderByWithRelationInput = {
    id?: SortOrder
    amount?: SortOrderInput | SortOrder
    date?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    receipt?: SortOrderInput | SortOrder
    createdat?: SortOrderInput | SortOrder
    updatedat?: SortOrderInput | SortOrder
    userid?: SortOrderInput | SortOrder
    categoryid?: SortOrderInput | SortOrder
    categories?: categoriesOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
  }

  export type expensesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: expensesWhereInput | expensesWhereInput[]
    OR?: expensesWhereInput[]
    NOT?: expensesWhereInput | expensesWhereInput[]
    amount?: DecimalNullableFilter<"expenses"> | Decimal | DecimalJsLike | number | string | null
    date?: DateTimeNullableFilter<"expenses"> | Date | string | null
    description?: StringNullableFilter<"expenses"> | string | null
    type?: StringNullableFilter<"expenses"> | string | null
    receipt?: StringNullableFilter<"expenses"> | string | null
    createdat?: DateTimeNullableFilter<"expenses"> | Date | string | null
    updatedat?: DateTimeNullableFilter<"expenses"> | Date | string | null
    userid?: IntNullableFilter<"expenses"> | number | null
    categoryid?: IntNullableFilter<"expenses"> | number | null
    categories?: XOR<CategoriesNullableScalarRelationFilter, categoriesWhereInput> | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }, "id">

  export type expensesOrderByWithAggregationInput = {
    id?: SortOrder
    amount?: SortOrderInput | SortOrder
    date?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    receipt?: SortOrderInput | SortOrder
    createdat?: SortOrderInput | SortOrder
    updatedat?: SortOrderInput | SortOrder
    userid?: SortOrderInput | SortOrder
    categoryid?: SortOrderInput | SortOrder
    _count?: expensesCountOrderByAggregateInput
    _avg?: expensesAvgOrderByAggregateInput
    _max?: expensesMaxOrderByAggregateInput
    _min?: expensesMinOrderByAggregateInput
    _sum?: expensesSumOrderByAggregateInput
  }

  export type expensesScalarWhereWithAggregatesInput = {
    AND?: expensesScalarWhereWithAggregatesInput | expensesScalarWhereWithAggregatesInput[]
    OR?: expensesScalarWhereWithAggregatesInput[]
    NOT?: expensesScalarWhereWithAggregatesInput | expensesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"expenses"> | number
    amount?: DecimalNullableWithAggregatesFilter<"expenses"> | Decimal | DecimalJsLike | number | string | null
    date?: DateTimeNullableWithAggregatesFilter<"expenses"> | Date | string | null
    description?: StringNullableWithAggregatesFilter<"expenses"> | string | null
    type?: StringNullableWithAggregatesFilter<"expenses"> | string | null
    receipt?: StringNullableWithAggregatesFilter<"expenses"> | string | null
    createdat?: DateTimeNullableWithAggregatesFilter<"expenses"> | Date | string | null
    updatedat?: DateTimeNullableWithAggregatesFilter<"expenses"> | Date | string | null
    userid?: IntNullableWithAggregatesFilter<"expenses"> | number | null
    categoryid?: IntNullableWithAggregatesFilter<"expenses"> | number | null
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: IntFilter<"users"> | number
    email?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    createdAt?: DateTimeNullableFilter<"users"> | Date | string | null
    username?: StringNullableFilter<"users"> | string | null
    updatedAt?: DateTimeNullableFilter<"users"> | Date | string | null
    profile?: StringNullableFilter<"users"> | string | null
    categories?: CategoriesListRelationFilter
    expenses?: ExpensesListRelationFilter
    incomes?: IncomesListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    profile?: SortOrderInput | SortOrder
    categories?: categoriesOrderByRelationAggregateInput
    expenses?: expensesOrderByRelationAggregateInput
    incomes?: incomesOrderByRelationAggregateInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    username?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    password?: StringFilter<"users"> | string
    createdAt?: DateTimeNullableFilter<"users"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"users"> | Date | string | null
    profile?: StringNullableFilter<"users"> | string | null
    categories?: CategoriesListRelationFilter
    expenses?: ExpensesListRelationFilter
    incomes?: IncomesListRelationFilter
  }, "id" | "email" | "username">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    profile?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"users"> | number
    email?: StringWithAggregatesFilter<"users"> | string
    password?: StringWithAggregatesFilter<"users"> | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    username?: StringNullableWithAggregatesFilter<"users"> | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    profile?: StringNullableWithAggregatesFilter<"users"> | string | null
  }

  export type incomesWhereInput = {
    AND?: incomesWhereInput | incomesWhereInput[]
    OR?: incomesWhereInput[]
    NOT?: incomesWhereInput | incomesWhereInput[]
    id?: IntFilter<"incomes"> | number
    user_id?: IntFilter<"incomes"> | number
    amount?: DecimalFilter<"incomes"> | Decimal | DecimalJsLike | number | string
    date?: DateTimeFilter<"incomes"> | Date | string
    source?: StringFilter<"incomes"> | string
    description?: StringNullableFilter<"incomes"> | string | null
    created_at?: DateTimeNullableFilter<"incomes"> | Date | string | null
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type incomesOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    source?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    users?: usersOrderByWithRelationInput
  }

  export type incomesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: incomesWhereInput | incomesWhereInput[]
    OR?: incomesWhereInput[]
    NOT?: incomesWhereInput | incomesWhereInput[]
    user_id?: IntFilter<"incomes"> | number
    amount?: DecimalFilter<"incomes"> | Decimal | DecimalJsLike | number | string
    date?: DateTimeFilter<"incomes"> | Date | string
    source?: StringFilter<"incomes"> | string
    description?: StringNullableFilter<"incomes"> | string | null
    created_at?: DateTimeNullableFilter<"incomes"> | Date | string | null
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type incomesOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    source?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: incomesCountOrderByAggregateInput
    _avg?: incomesAvgOrderByAggregateInput
    _max?: incomesMaxOrderByAggregateInput
    _min?: incomesMinOrderByAggregateInput
    _sum?: incomesSumOrderByAggregateInput
  }

  export type incomesScalarWhereWithAggregatesInput = {
    AND?: incomesScalarWhereWithAggregatesInput | incomesScalarWhereWithAggregatesInput[]
    OR?: incomesScalarWhereWithAggregatesInput[]
    NOT?: incomesScalarWhereWithAggregatesInput | incomesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"incomes"> | number
    user_id?: IntWithAggregatesFilter<"incomes"> | number
    amount?: DecimalWithAggregatesFilter<"incomes"> | Decimal | DecimalJsLike | number | string
    date?: DateTimeWithAggregatesFilter<"incomes"> | Date | string
    source?: StringWithAggregatesFilter<"incomes"> | string
    description?: StringNullableWithAggregatesFilter<"incomes"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"incomes"> | Date | string | null
  }

  export type categoriesCreateInput = {
    name?: string | null
    budget?: Decimal | DecimalJsLike | number | string | null
    createdat?: Date | string | null
    updatedat?: Date | string | null
    users?: usersCreateNestedOneWithoutCategoriesInput
    expenses?: expensesCreateNestedManyWithoutCategoriesInput
  }

  export type categoriesUncheckedCreateInput = {
    id?: number
    name?: string | null
    budget?: Decimal | DecimalJsLike | number | string | null
    createdat?: Date | string | null
    updatedat?: Date | string | null
    userid?: number | null
    expenses?: expensesUncheckedCreateNestedManyWithoutCategoriesInput
  }

  export type categoriesUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    budget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneWithoutCategoriesNestedInput
    expenses?: expensesUpdateManyWithoutCategoriesNestedInput
  }

  export type categoriesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    budget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userid?: NullableIntFieldUpdateOperationsInput | number | null
    expenses?: expensesUncheckedUpdateManyWithoutCategoriesNestedInput
  }

  export type categoriesCreateManyInput = {
    id?: number
    name?: string | null
    budget?: Decimal | DecimalJsLike | number | string | null
    createdat?: Date | string | null
    updatedat?: Date | string | null
    userid?: number | null
  }

  export type categoriesUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    budget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type categoriesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    budget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userid?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type expensesCreateInput = {
    amount?: Decimal | DecimalJsLike | number | string | null
    date?: Date | string | null
    description?: string | null
    type?: string | null
    receipt?: string | null
    createdat?: Date | string | null
    updatedat?: Date | string | null
    categories?: categoriesCreateNestedOneWithoutExpensesInput
    users?: usersCreateNestedOneWithoutExpensesInput
  }

  export type expensesUncheckedCreateInput = {
    id?: number
    amount?: Decimal | DecimalJsLike | number | string | null
    date?: Date | string | null
    description?: string | null
    type?: string | null
    receipt?: string | null
    createdat?: Date | string | null
    updatedat?: Date | string | null
    userid?: number | null
    categoryid?: number | null
  }

  export type expensesUpdateInput = {
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categories?: categoriesUpdateOneWithoutExpensesNestedInput
    users?: usersUpdateOneWithoutExpensesNestedInput
  }

  export type expensesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userid?: NullableIntFieldUpdateOperationsInput | number | null
    categoryid?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type expensesCreateManyInput = {
    id?: number
    amount?: Decimal | DecimalJsLike | number | string | null
    date?: Date | string | null
    description?: string | null
    type?: string | null
    receipt?: string | null
    createdat?: Date | string | null
    updatedat?: Date | string | null
    userid?: number | null
    categoryid?: number | null
  }

  export type expensesUpdateManyMutationInput = {
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type expensesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userid?: NullableIntFieldUpdateOperationsInput | number | null
    categoryid?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type usersCreateInput = {
    email: string
    password: string
    createdAt?: Date | string | null
    username?: string | null
    updatedAt?: Date | string | null
    profile?: string | null
    categories?: categoriesCreateNestedManyWithoutUsersInput
    expenses?: expensesCreateNestedManyWithoutUsersInput
    incomes?: incomesCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    id?: number
    email: string
    password: string
    createdAt?: Date | string | null
    username?: string | null
    updatedAt?: Date | string | null
    profile?: string | null
    categories?: categoriesUncheckedCreateNestedManyWithoutUsersInput
    expenses?: expensesUncheckedCreateNestedManyWithoutUsersInput
    incomes?: incomesUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    categories?: categoriesUpdateManyWithoutUsersNestedInput
    expenses?: expensesUpdateManyWithoutUsersNestedInput
    incomes?: incomesUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    categories?: categoriesUncheckedUpdateManyWithoutUsersNestedInput
    expenses?: expensesUncheckedUpdateManyWithoutUsersNestedInput
    incomes?: incomesUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    id?: number
    email: string
    password: string
    createdAt?: Date | string | null
    username?: string | null
    updatedAt?: Date | string | null
    profile?: string | null
  }

  export type usersUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profile?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profile?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type incomesCreateInput = {
    amount: Decimal | DecimalJsLike | number | string
    date: Date | string
    source: string
    description?: string | null
    created_at?: Date | string | null
    users: usersCreateNestedOneWithoutIncomesInput
  }

  export type incomesUncheckedCreateInput = {
    id?: number
    user_id: number
    amount: Decimal | DecimalJsLike | number | string
    date: Date | string
    source: string
    description?: string | null
    created_at?: Date | string | null
  }

  export type incomesUpdateInput = {
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneRequiredWithoutIncomesNestedInput
  }

  export type incomesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type incomesCreateManyInput = {
    id?: number
    user_id: number
    amount: Decimal | DecimalJsLike | number | string
    date: Date | string
    source: string
    description?: string | null
    created_at?: Date | string | null
  }

  export type incomesUpdateManyMutationInput = {
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type incomesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UsersNullableScalarRelationFilter = {
    is?: usersWhereInput | null
    isNot?: usersWhereInput | null
  }

  export type ExpensesListRelationFilter = {
    every?: expensesWhereInput
    some?: expensesWhereInput
    none?: expensesWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type expensesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type categoriesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    budget?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
    userid?: SortOrder
  }

  export type categoriesAvgOrderByAggregateInput = {
    id?: SortOrder
    budget?: SortOrder
    userid?: SortOrder
  }

  export type categoriesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    budget?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
    userid?: SortOrder
  }

  export type categoriesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    budget?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
    userid?: SortOrder
  }

  export type categoriesSumOrderByAggregateInput = {
    id?: SortOrder
    budget?: SortOrder
    userid?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type CategoriesNullableScalarRelationFilter = {
    is?: categoriesWhereInput | null
    isNot?: categoriesWhereInput | null
  }

  export type expensesCountOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    description?: SortOrder
    type?: SortOrder
    receipt?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
    userid?: SortOrder
    categoryid?: SortOrder
  }

  export type expensesAvgOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    userid?: SortOrder
    categoryid?: SortOrder
  }

  export type expensesMaxOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    description?: SortOrder
    type?: SortOrder
    receipt?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
    userid?: SortOrder
    categoryid?: SortOrder
  }

  export type expensesMinOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    description?: SortOrder
    type?: SortOrder
    receipt?: SortOrder
    createdat?: SortOrder
    updatedat?: SortOrder
    userid?: SortOrder
    categoryid?: SortOrder
  }

  export type expensesSumOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    userid?: SortOrder
    categoryid?: SortOrder
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type CategoriesListRelationFilter = {
    every?: categoriesWhereInput
    some?: categoriesWhereInput
    none?: categoriesWhereInput
  }

  export type IncomesListRelationFilter = {
    every?: incomesWhereInput
    some?: incomesWhereInput
    none?: incomesWhereInput
  }

  export type categoriesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type incomesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    username?: SortOrder
    updatedAt?: SortOrder
    profile?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    username?: SortOrder
    updatedAt?: SortOrder
    profile?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    username?: SortOrder
    updatedAt?: SortOrder
    profile?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type incomesCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    source?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
  }

  export type incomesAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
  }

  export type incomesMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    source?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
  }

  export type incomesMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    source?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
  }

  export type incomesSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type usersCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<usersCreateWithoutCategoriesInput, usersUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: usersCreateOrConnectWithoutCategoriesInput
    connect?: usersWhereUniqueInput
  }

  export type expensesCreateNestedManyWithoutCategoriesInput = {
    create?: XOR<expensesCreateWithoutCategoriesInput, expensesUncheckedCreateWithoutCategoriesInput> | expensesCreateWithoutCategoriesInput[] | expensesUncheckedCreateWithoutCategoriesInput[]
    connectOrCreate?: expensesCreateOrConnectWithoutCategoriesInput | expensesCreateOrConnectWithoutCategoriesInput[]
    createMany?: expensesCreateManyCategoriesInputEnvelope
    connect?: expensesWhereUniqueInput | expensesWhereUniqueInput[]
  }

  export type expensesUncheckedCreateNestedManyWithoutCategoriesInput = {
    create?: XOR<expensesCreateWithoutCategoriesInput, expensesUncheckedCreateWithoutCategoriesInput> | expensesCreateWithoutCategoriesInput[] | expensesUncheckedCreateWithoutCategoriesInput[]
    connectOrCreate?: expensesCreateOrConnectWithoutCategoriesInput | expensesCreateOrConnectWithoutCategoriesInput[]
    createMany?: expensesCreateManyCategoriesInputEnvelope
    connect?: expensesWhereUniqueInput | expensesWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type usersUpdateOneWithoutCategoriesNestedInput = {
    create?: XOR<usersCreateWithoutCategoriesInput, usersUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: usersCreateOrConnectWithoutCategoriesInput
    upsert?: usersUpsertWithoutCategoriesInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutCategoriesInput, usersUpdateWithoutCategoriesInput>, usersUncheckedUpdateWithoutCategoriesInput>
  }

  export type expensesUpdateManyWithoutCategoriesNestedInput = {
    create?: XOR<expensesCreateWithoutCategoriesInput, expensesUncheckedCreateWithoutCategoriesInput> | expensesCreateWithoutCategoriesInput[] | expensesUncheckedCreateWithoutCategoriesInput[]
    connectOrCreate?: expensesCreateOrConnectWithoutCategoriesInput | expensesCreateOrConnectWithoutCategoriesInput[]
    upsert?: expensesUpsertWithWhereUniqueWithoutCategoriesInput | expensesUpsertWithWhereUniqueWithoutCategoriesInput[]
    createMany?: expensesCreateManyCategoriesInputEnvelope
    set?: expensesWhereUniqueInput | expensesWhereUniqueInput[]
    disconnect?: expensesWhereUniqueInput | expensesWhereUniqueInput[]
    delete?: expensesWhereUniqueInput | expensesWhereUniqueInput[]
    connect?: expensesWhereUniqueInput | expensesWhereUniqueInput[]
    update?: expensesUpdateWithWhereUniqueWithoutCategoriesInput | expensesUpdateWithWhereUniqueWithoutCategoriesInput[]
    updateMany?: expensesUpdateManyWithWhereWithoutCategoriesInput | expensesUpdateManyWithWhereWithoutCategoriesInput[]
    deleteMany?: expensesScalarWhereInput | expensesScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type expensesUncheckedUpdateManyWithoutCategoriesNestedInput = {
    create?: XOR<expensesCreateWithoutCategoriesInput, expensesUncheckedCreateWithoutCategoriesInput> | expensesCreateWithoutCategoriesInput[] | expensesUncheckedCreateWithoutCategoriesInput[]
    connectOrCreate?: expensesCreateOrConnectWithoutCategoriesInput | expensesCreateOrConnectWithoutCategoriesInput[]
    upsert?: expensesUpsertWithWhereUniqueWithoutCategoriesInput | expensesUpsertWithWhereUniqueWithoutCategoriesInput[]
    createMany?: expensesCreateManyCategoriesInputEnvelope
    set?: expensesWhereUniqueInput | expensesWhereUniqueInput[]
    disconnect?: expensesWhereUniqueInput | expensesWhereUniqueInput[]
    delete?: expensesWhereUniqueInput | expensesWhereUniqueInput[]
    connect?: expensesWhereUniqueInput | expensesWhereUniqueInput[]
    update?: expensesUpdateWithWhereUniqueWithoutCategoriesInput | expensesUpdateWithWhereUniqueWithoutCategoriesInput[]
    updateMany?: expensesUpdateManyWithWhereWithoutCategoriesInput | expensesUpdateManyWithWhereWithoutCategoriesInput[]
    deleteMany?: expensesScalarWhereInput | expensesScalarWhereInput[]
  }

  export type categoriesCreateNestedOneWithoutExpensesInput = {
    create?: XOR<categoriesCreateWithoutExpensesInput, categoriesUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: categoriesCreateOrConnectWithoutExpensesInput
    connect?: categoriesWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutExpensesInput = {
    create?: XOR<usersCreateWithoutExpensesInput, usersUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: usersCreateOrConnectWithoutExpensesInput
    connect?: usersWhereUniqueInput
  }

  export type categoriesUpdateOneWithoutExpensesNestedInput = {
    create?: XOR<categoriesCreateWithoutExpensesInput, categoriesUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: categoriesCreateOrConnectWithoutExpensesInput
    upsert?: categoriesUpsertWithoutExpensesInput
    disconnect?: categoriesWhereInput | boolean
    delete?: categoriesWhereInput | boolean
    connect?: categoriesWhereUniqueInput
    update?: XOR<XOR<categoriesUpdateToOneWithWhereWithoutExpensesInput, categoriesUpdateWithoutExpensesInput>, categoriesUncheckedUpdateWithoutExpensesInput>
  }

  export type usersUpdateOneWithoutExpensesNestedInput = {
    create?: XOR<usersCreateWithoutExpensesInput, usersUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: usersCreateOrConnectWithoutExpensesInput
    upsert?: usersUpsertWithoutExpensesInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutExpensesInput, usersUpdateWithoutExpensesInput>, usersUncheckedUpdateWithoutExpensesInput>
  }

  export type categoriesCreateNestedManyWithoutUsersInput = {
    create?: XOR<categoriesCreateWithoutUsersInput, categoriesUncheckedCreateWithoutUsersInput> | categoriesCreateWithoutUsersInput[] | categoriesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: categoriesCreateOrConnectWithoutUsersInput | categoriesCreateOrConnectWithoutUsersInput[]
    createMany?: categoriesCreateManyUsersInputEnvelope
    connect?: categoriesWhereUniqueInput | categoriesWhereUniqueInput[]
  }

  export type expensesCreateNestedManyWithoutUsersInput = {
    create?: XOR<expensesCreateWithoutUsersInput, expensesUncheckedCreateWithoutUsersInput> | expensesCreateWithoutUsersInput[] | expensesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: expensesCreateOrConnectWithoutUsersInput | expensesCreateOrConnectWithoutUsersInput[]
    createMany?: expensesCreateManyUsersInputEnvelope
    connect?: expensesWhereUniqueInput | expensesWhereUniqueInput[]
  }

  export type incomesCreateNestedManyWithoutUsersInput = {
    create?: XOR<incomesCreateWithoutUsersInput, incomesUncheckedCreateWithoutUsersInput> | incomesCreateWithoutUsersInput[] | incomesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: incomesCreateOrConnectWithoutUsersInput | incomesCreateOrConnectWithoutUsersInput[]
    createMany?: incomesCreateManyUsersInputEnvelope
    connect?: incomesWhereUniqueInput | incomesWhereUniqueInput[]
  }

  export type categoriesUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<categoriesCreateWithoutUsersInput, categoriesUncheckedCreateWithoutUsersInput> | categoriesCreateWithoutUsersInput[] | categoriesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: categoriesCreateOrConnectWithoutUsersInput | categoriesCreateOrConnectWithoutUsersInput[]
    createMany?: categoriesCreateManyUsersInputEnvelope
    connect?: categoriesWhereUniqueInput | categoriesWhereUniqueInput[]
  }

  export type expensesUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<expensesCreateWithoutUsersInput, expensesUncheckedCreateWithoutUsersInput> | expensesCreateWithoutUsersInput[] | expensesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: expensesCreateOrConnectWithoutUsersInput | expensesCreateOrConnectWithoutUsersInput[]
    createMany?: expensesCreateManyUsersInputEnvelope
    connect?: expensesWhereUniqueInput | expensesWhereUniqueInput[]
  }

  export type incomesUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<incomesCreateWithoutUsersInput, incomesUncheckedCreateWithoutUsersInput> | incomesCreateWithoutUsersInput[] | incomesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: incomesCreateOrConnectWithoutUsersInput | incomesCreateOrConnectWithoutUsersInput[]
    createMany?: incomesCreateManyUsersInputEnvelope
    connect?: incomesWhereUniqueInput | incomesWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type categoriesUpdateManyWithoutUsersNestedInput = {
    create?: XOR<categoriesCreateWithoutUsersInput, categoriesUncheckedCreateWithoutUsersInput> | categoriesCreateWithoutUsersInput[] | categoriesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: categoriesCreateOrConnectWithoutUsersInput | categoriesCreateOrConnectWithoutUsersInput[]
    upsert?: categoriesUpsertWithWhereUniqueWithoutUsersInput | categoriesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: categoriesCreateManyUsersInputEnvelope
    set?: categoriesWhereUniqueInput | categoriesWhereUniqueInput[]
    disconnect?: categoriesWhereUniqueInput | categoriesWhereUniqueInput[]
    delete?: categoriesWhereUniqueInput | categoriesWhereUniqueInput[]
    connect?: categoriesWhereUniqueInput | categoriesWhereUniqueInput[]
    update?: categoriesUpdateWithWhereUniqueWithoutUsersInput | categoriesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: categoriesUpdateManyWithWhereWithoutUsersInput | categoriesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: categoriesScalarWhereInput | categoriesScalarWhereInput[]
  }

  export type expensesUpdateManyWithoutUsersNestedInput = {
    create?: XOR<expensesCreateWithoutUsersInput, expensesUncheckedCreateWithoutUsersInput> | expensesCreateWithoutUsersInput[] | expensesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: expensesCreateOrConnectWithoutUsersInput | expensesCreateOrConnectWithoutUsersInput[]
    upsert?: expensesUpsertWithWhereUniqueWithoutUsersInput | expensesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: expensesCreateManyUsersInputEnvelope
    set?: expensesWhereUniqueInput | expensesWhereUniqueInput[]
    disconnect?: expensesWhereUniqueInput | expensesWhereUniqueInput[]
    delete?: expensesWhereUniqueInput | expensesWhereUniqueInput[]
    connect?: expensesWhereUniqueInput | expensesWhereUniqueInput[]
    update?: expensesUpdateWithWhereUniqueWithoutUsersInput | expensesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: expensesUpdateManyWithWhereWithoutUsersInput | expensesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: expensesScalarWhereInput | expensesScalarWhereInput[]
  }

  export type incomesUpdateManyWithoutUsersNestedInput = {
    create?: XOR<incomesCreateWithoutUsersInput, incomesUncheckedCreateWithoutUsersInput> | incomesCreateWithoutUsersInput[] | incomesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: incomesCreateOrConnectWithoutUsersInput | incomesCreateOrConnectWithoutUsersInput[]
    upsert?: incomesUpsertWithWhereUniqueWithoutUsersInput | incomesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: incomesCreateManyUsersInputEnvelope
    set?: incomesWhereUniqueInput | incomesWhereUniqueInput[]
    disconnect?: incomesWhereUniqueInput | incomesWhereUniqueInput[]
    delete?: incomesWhereUniqueInput | incomesWhereUniqueInput[]
    connect?: incomesWhereUniqueInput | incomesWhereUniqueInput[]
    update?: incomesUpdateWithWhereUniqueWithoutUsersInput | incomesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: incomesUpdateManyWithWhereWithoutUsersInput | incomesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: incomesScalarWhereInput | incomesScalarWhereInput[]
  }

  export type categoriesUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<categoriesCreateWithoutUsersInput, categoriesUncheckedCreateWithoutUsersInput> | categoriesCreateWithoutUsersInput[] | categoriesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: categoriesCreateOrConnectWithoutUsersInput | categoriesCreateOrConnectWithoutUsersInput[]
    upsert?: categoriesUpsertWithWhereUniqueWithoutUsersInput | categoriesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: categoriesCreateManyUsersInputEnvelope
    set?: categoriesWhereUniqueInput | categoriesWhereUniqueInput[]
    disconnect?: categoriesWhereUniqueInput | categoriesWhereUniqueInput[]
    delete?: categoriesWhereUniqueInput | categoriesWhereUniqueInput[]
    connect?: categoriesWhereUniqueInput | categoriesWhereUniqueInput[]
    update?: categoriesUpdateWithWhereUniqueWithoutUsersInput | categoriesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: categoriesUpdateManyWithWhereWithoutUsersInput | categoriesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: categoriesScalarWhereInput | categoriesScalarWhereInput[]
  }

  export type expensesUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<expensesCreateWithoutUsersInput, expensesUncheckedCreateWithoutUsersInput> | expensesCreateWithoutUsersInput[] | expensesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: expensesCreateOrConnectWithoutUsersInput | expensesCreateOrConnectWithoutUsersInput[]
    upsert?: expensesUpsertWithWhereUniqueWithoutUsersInput | expensesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: expensesCreateManyUsersInputEnvelope
    set?: expensesWhereUniqueInput | expensesWhereUniqueInput[]
    disconnect?: expensesWhereUniqueInput | expensesWhereUniqueInput[]
    delete?: expensesWhereUniqueInput | expensesWhereUniqueInput[]
    connect?: expensesWhereUniqueInput | expensesWhereUniqueInput[]
    update?: expensesUpdateWithWhereUniqueWithoutUsersInput | expensesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: expensesUpdateManyWithWhereWithoutUsersInput | expensesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: expensesScalarWhereInput | expensesScalarWhereInput[]
  }

  export type incomesUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<incomesCreateWithoutUsersInput, incomesUncheckedCreateWithoutUsersInput> | incomesCreateWithoutUsersInput[] | incomesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: incomesCreateOrConnectWithoutUsersInput | incomesCreateOrConnectWithoutUsersInput[]
    upsert?: incomesUpsertWithWhereUniqueWithoutUsersInput | incomesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: incomesCreateManyUsersInputEnvelope
    set?: incomesWhereUniqueInput | incomesWhereUniqueInput[]
    disconnect?: incomesWhereUniqueInput | incomesWhereUniqueInput[]
    delete?: incomesWhereUniqueInput | incomesWhereUniqueInput[]
    connect?: incomesWhereUniqueInput | incomesWhereUniqueInput[]
    update?: incomesUpdateWithWhereUniqueWithoutUsersInput | incomesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: incomesUpdateManyWithWhereWithoutUsersInput | incomesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: incomesScalarWhereInput | incomesScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutIncomesInput = {
    create?: XOR<usersCreateWithoutIncomesInput, usersUncheckedCreateWithoutIncomesInput>
    connectOrCreate?: usersCreateOrConnectWithoutIncomesInput
    connect?: usersWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type usersUpdateOneRequiredWithoutIncomesNestedInput = {
    create?: XOR<usersCreateWithoutIncomesInput, usersUncheckedCreateWithoutIncomesInput>
    connectOrCreate?: usersCreateOrConnectWithoutIncomesInput
    upsert?: usersUpsertWithoutIncomesInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutIncomesInput, usersUpdateWithoutIncomesInput>, usersUncheckedUpdateWithoutIncomesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type usersCreateWithoutCategoriesInput = {
    email: string
    password: string
    createdAt?: Date | string | null
    username?: string | null
    updatedAt?: Date | string | null
    profile?: string | null
    expenses?: expensesCreateNestedManyWithoutUsersInput
    incomes?: incomesCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutCategoriesInput = {
    id?: number
    email: string
    password: string
    createdAt?: Date | string | null
    username?: string | null
    updatedAt?: Date | string | null
    profile?: string | null
    expenses?: expensesUncheckedCreateNestedManyWithoutUsersInput
    incomes?: incomesUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutCategoriesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutCategoriesInput, usersUncheckedCreateWithoutCategoriesInput>
  }

  export type expensesCreateWithoutCategoriesInput = {
    amount?: Decimal | DecimalJsLike | number | string | null
    date?: Date | string | null
    description?: string | null
    type?: string | null
    receipt?: string | null
    createdat?: Date | string | null
    updatedat?: Date | string | null
    users?: usersCreateNestedOneWithoutExpensesInput
  }

  export type expensesUncheckedCreateWithoutCategoriesInput = {
    id?: number
    amount?: Decimal | DecimalJsLike | number | string | null
    date?: Date | string | null
    description?: string | null
    type?: string | null
    receipt?: string | null
    createdat?: Date | string | null
    updatedat?: Date | string | null
    userid?: number | null
  }

  export type expensesCreateOrConnectWithoutCategoriesInput = {
    where: expensesWhereUniqueInput
    create: XOR<expensesCreateWithoutCategoriesInput, expensesUncheckedCreateWithoutCategoriesInput>
  }

  export type expensesCreateManyCategoriesInputEnvelope = {
    data: expensesCreateManyCategoriesInput | expensesCreateManyCategoriesInput[]
    skipDuplicates?: boolean
  }

  export type usersUpsertWithoutCategoriesInput = {
    update: XOR<usersUpdateWithoutCategoriesInput, usersUncheckedUpdateWithoutCategoriesInput>
    create: XOR<usersCreateWithoutCategoriesInput, usersUncheckedCreateWithoutCategoriesInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutCategoriesInput, usersUncheckedUpdateWithoutCategoriesInput>
  }

  export type usersUpdateWithoutCategoriesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    expenses?: expensesUpdateManyWithoutUsersNestedInput
    incomes?: incomesUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutCategoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    expenses?: expensesUncheckedUpdateManyWithoutUsersNestedInput
    incomes?: incomesUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type expensesUpsertWithWhereUniqueWithoutCategoriesInput = {
    where: expensesWhereUniqueInput
    update: XOR<expensesUpdateWithoutCategoriesInput, expensesUncheckedUpdateWithoutCategoriesInput>
    create: XOR<expensesCreateWithoutCategoriesInput, expensesUncheckedCreateWithoutCategoriesInput>
  }

  export type expensesUpdateWithWhereUniqueWithoutCategoriesInput = {
    where: expensesWhereUniqueInput
    data: XOR<expensesUpdateWithoutCategoriesInput, expensesUncheckedUpdateWithoutCategoriesInput>
  }

  export type expensesUpdateManyWithWhereWithoutCategoriesInput = {
    where: expensesScalarWhereInput
    data: XOR<expensesUpdateManyMutationInput, expensesUncheckedUpdateManyWithoutCategoriesInput>
  }

  export type expensesScalarWhereInput = {
    AND?: expensesScalarWhereInput | expensesScalarWhereInput[]
    OR?: expensesScalarWhereInput[]
    NOT?: expensesScalarWhereInput | expensesScalarWhereInput[]
    id?: IntFilter<"expenses"> | number
    amount?: DecimalNullableFilter<"expenses"> | Decimal | DecimalJsLike | number | string | null
    date?: DateTimeNullableFilter<"expenses"> | Date | string | null
    description?: StringNullableFilter<"expenses"> | string | null
    type?: StringNullableFilter<"expenses"> | string | null
    receipt?: StringNullableFilter<"expenses"> | string | null
    createdat?: DateTimeNullableFilter<"expenses"> | Date | string | null
    updatedat?: DateTimeNullableFilter<"expenses"> | Date | string | null
    userid?: IntNullableFilter<"expenses"> | number | null
    categoryid?: IntNullableFilter<"expenses"> | number | null
  }

  export type categoriesCreateWithoutExpensesInput = {
    name?: string | null
    budget?: Decimal | DecimalJsLike | number | string | null
    createdat?: Date | string | null
    updatedat?: Date | string | null
    users?: usersCreateNestedOneWithoutCategoriesInput
  }

  export type categoriesUncheckedCreateWithoutExpensesInput = {
    id?: number
    name?: string | null
    budget?: Decimal | DecimalJsLike | number | string | null
    createdat?: Date | string | null
    updatedat?: Date | string | null
    userid?: number | null
  }

  export type categoriesCreateOrConnectWithoutExpensesInput = {
    where: categoriesWhereUniqueInput
    create: XOR<categoriesCreateWithoutExpensesInput, categoriesUncheckedCreateWithoutExpensesInput>
  }

  export type usersCreateWithoutExpensesInput = {
    email: string
    password: string
    createdAt?: Date | string | null
    username?: string | null
    updatedAt?: Date | string | null
    profile?: string | null
    categories?: categoriesCreateNestedManyWithoutUsersInput
    incomes?: incomesCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutExpensesInput = {
    id?: number
    email: string
    password: string
    createdAt?: Date | string | null
    username?: string | null
    updatedAt?: Date | string | null
    profile?: string | null
    categories?: categoriesUncheckedCreateNestedManyWithoutUsersInput
    incomes?: incomesUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutExpensesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutExpensesInput, usersUncheckedCreateWithoutExpensesInput>
  }

  export type categoriesUpsertWithoutExpensesInput = {
    update: XOR<categoriesUpdateWithoutExpensesInput, categoriesUncheckedUpdateWithoutExpensesInput>
    create: XOR<categoriesCreateWithoutExpensesInput, categoriesUncheckedCreateWithoutExpensesInput>
    where?: categoriesWhereInput
  }

  export type categoriesUpdateToOneWithWhereWithoutExpensesInput = {
    where?: categoriesWhereInput
    data: XOR<categoriesUpdateWithoutExpensesInput, categoriesUncheckedUpdateWithoutExpensesInput>
  }

  export type categoriesUpdateWithoutExpensesInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    budget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneWithoutCategoriesNestedInput
  }

  export type categoriesUncheckedUpdateWithoutExpensesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    budget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userid?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type usersUpsertWithoutExpensesInput = {
    update: XOR<usersUpdateWithoutExpensesInput, usersUncheckedUpdateWithoutExpensesInput>
    create: XOR<usersCreateWithoutExpensesInput, usersUncheckedCreateWithoutExpensesInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutExpensesInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutExpensesInput, usersUncheckedUpdateWithoutExpensesInput>
  }

  export type usersUpdateWithoutExpensesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    categories?: categoriesUpdateManyWithoutUsersNestedInput
    incomes?: incomesUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutExpensesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    categories?: categoriesUncheckedUpdateManyWithoutUsersNestedInput
    incomes?: incomesUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type categoriesCreateWithoutUsersInput = {
    name?: string | null
    budget?: Decimal | DecimalJsLike | number | string | null
    createdat?: Date | string | null
    updatedat?: Date | string | null
    expenses?: expensesCreateNestedManyWithoutCategoriesInput
  }

  export type categoriesUncheckedCreateWithoutUsersInput = {
    id?: number
    name?: string | null
    budget?: Decimal | DecimalJsLike | number | string | null
    createdat?: Date | string | null
    updatedat?: Date | string | null
    expenses?: expensesUncheckedCreateNestedManyWithoutCategoriesInput
  }

  export type categoriesCreateOrConnectWithoutUsersInput = {
    where: categoriesWhereUniqueInput
    create: XOR<categoriesCreateWithoutUsersInput, categoriesUncheckedCreateWithoutUsersInput>
  }

  export type categoriesCreateManyUsersInputEnvelope = {
    data: categoriesCreateManyUsersInput | categoriesCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type expensesCreateWithoutUsersInput = {
    amount?: Decimal | DecimalJsLike | number | string | null
    date?: Date | string | null
    description?: string | null
    type?: string | null
    receipt?: string | null
    createdat?: Date | string | null
    updatedat?: Date | string | null
    categories?: categoriesCreateNestedOneWithoutExpensesInput
  }

  export type expensesUncheckedCreateWithoutUsersInput = {
    id?: number
    amount?: Decimal | DecimalJsLike | number | string | null
    date?: Date | string | null
    description?: string | null
    type?: string | null
    receipt?: string | null
    createdat?: Date | string | null
    updatedat?: Date | string | null
    categoryid?: number | null
  }

  export type expensesCreateOrConnectWithoutUsersInput = {
    where: expensesWhereUniqueInput
    create: XOR<expensesCreateWithoutUsersInput, expensesUncheckedCreateWithoutUsersInput>
  }

  export type expensesCreateManyUsersInputEnvelope = {
    data: expensesCreateManyUsersInput | expensesCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type incomesCreateWithoutUsersInput = {
    amount: Decimal | DecimalJsLike | number | string
    date: Date | string
    source: string
    description?: string | null
    created_at?: Date | string | null
  }

  export type incomesUncheckedCreateWithoutUsersInput = {
    id?: number
    amount: Decimal | DecimalJsLike | number | string
    date: Date | string
    source: string
    description?: string | null
    created_at?: Date | string | null
  }

  export type incomesCreateOrConnectWithoutUsersInput = {
    where: incomesWhereUniqueInput
    create: XOR<incomesCreateWithoutUsersInput, incomesUncheckedCreateWithoutUsersInput>
  }

  export type incomesCreateManyUsersInputEnvelope = {
    data: incomesCreateManyUsersInput | incomesCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type categoriesUpsertWithWhereUniqueWithoutUsersInput = {
    where: categoriesWhereUniqueInput
    update: XOR<categoriesUpdateWithoutUsersInput, categoriesUncheckedUpdateWithoutUsersInput>
    create: XOR<categoriesCreateWithoutUsersInput, categoriesUncheckedCreateWithoutUsersInput>
  }

  export type categoriesUpdateWithWhereUniqueWithoutUsersInput = {
    where: categoriesWhereUniqueInput
    data: XOR<categoriesUpdateWithoutUsersInput, categoriesUncheckedUpdateWithoutUsersInput>
  }

  export type categoriesUpdateManyWithWhereWithoutUsersInput = {
    where: categoriesScalarWhereInput
    data: XOR<categoriesUpdateManyMutationInput, categoriesUncheckedUpdateManyWithoutUsersInput>
  }

  export type categoriesScalarWhereInput = {
    AND?: categoriesScalarWhereInput | categoriesScalarWhereInput[]
    OR?: categoriesScalarWhereInput[]
    NOT?: categoriesScalarWhereInput | categoriesScalarWhereInput[]
    id?: IntFilter<"categories"> | number
    name?: StringNullableFilter<"categories"> | string | null
    budget?: DecimalNullableFilter<"categories"> | Decimal | DecimalJsLike | number | string | null
    createdat?: DateTimeNullableFilter<"categories"> | Date | string | null
    updatedat?: DateTimeNullableFilter<"categories"> | Date | string | null
    userid?: IntNullableFilter<"categories"> | number | null
  }

  export type expensesUpsertWithWhereUniqueWithoutUsersInput = {
    where: expensesWhereUniqueInput
    update: XOR<expensesUpdateWithoutUsersInput, expensesUncheckedUpdateWithoutUsersInput>
    create: XOR<expensesCreateWithoutUsersInput, expensesUncheckedCreateWithoutUsersInput>
  }

  export type expensesUpdateWithWhereUniqueWithoutUsersInput = {
    where: expensesWhereUniqueInput
    data: XOR<expensesUpdateWithoutUsersInput, expensesUncheckedUpdateWithoutUsersInput>
  }

  export type expensesUpdateManyWithWhereWithoutUsersInput = {
    where: expensesScalarWhereInput
    data: XOR<expensesUpdateManyMutationInput, expensesUncheckedUpdateManyWithoutUsersInput>
  }

  export type incomesUpsertWithWhereUniqueWithoutUsersInput = {
    where: incomesWhereUniqueInput
    update: XOR<incomesUpdateWithoutUsersInput, incomesUncheckedUpdateWithoutUsersInput>
    create: XOR<incomesCreateWithoutUsersInput, incomesUncheckedCreateWithoutUsersInput>
  }

  export type incomesUpdateWithWhereUniqueWithoutUsersInput = {
    where: incomesWhereUniqueInput
    data: XOR<incomesUpdateWithoutUsersInput, incomesUncheckedUpdateWithoutUsersInput>
  }

  export type incomesUpdateManyWithWhereWithoutUsersInput = {
    where: incomesScalarWhereInput
    data: XOR<incomesUpdateManyMutationInput, incomesUncheckedUpdateManyWithoutUsersInput>
  }

  export type incomesScalarWhereInput = {
    AND?: incomesScalarWhereInput | incomesScalarWhereInput[]
    OR?: incomesScalarWhereInput[]
    NOT?: incomesScalarWhereInput | incomesScalarWhereInput[]
    id?: IntFilter<"incomes"> | number
    user_id?: IntFilter<"incomes"> | number
    amount?: DecimalFilter<"incomes"> | Decimal | DecimalJsLike | number | string
    date?: DateTimeFilter<"incomes"> | Date | string
    source?: StringFilter<"incomes"> | string
    description?: StringNullableFilter<"incomes"> | string | null
    created_at?: DateTimeNullableFilter<"incomes"> | Date | string | null
  }

  export type usersCreateWithoutIncomesInput = {
    email: string
    password: string
    createdAt?: Date | string | null
    username?: string | null
    updatedAt?: Date | string | null
    profile?: string | null
    categories?: categoriesCreateNestedManyWithoutUsersInput
    expenses?: expensesCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutIncomesInput = {
    id?: number
    email: string
    password: string
    createdAt?: Date | string | null
    username?: string | null
    updatedAt?: Date | string | null
    profile?: string | null
    categories?: categoriesUncheckedCreateNestedManyWithoutUsersInput
    expenses?: expensesUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutIncomesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutIncomesInput, usersUncheckedCreateWithoutIncomesInput>
  }

  export type usersUpsertWithoutIncomesInput = {
    update: XOR<usersUpdateWithoutIncomesInput, usersUncheckedUpdateWithoutIncomesInput>
    create: XOR<usersCreateWithoutIncomesInput, usersUncheckedCreateWithoutIncomesInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutIncomesInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutIncomesInput, usersUncheckedUpdateWithoutIncomesInput>
  }

  export type usersUpdateWithoutIncomesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    categories?: categoriesUpdateManyWithoutUsersNestedInput
    expenses?: expensesUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutIncomesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profile?: NullableStringFieldUpdateOperationsInput | string | null
    categories?: categoriesUncheckedUpdateManyWithoutUsersNestedInput
    expenses?: expensesUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type expensesCreateManyCategoriesInput = {
    id?: number
    amount?: Decimal | DecimalJsLike | number | string | null
    date?: Date | string | null
    description?: string | null
    type?: string | null
    receipt?: string | null
    createdat?: Date | string | null
    updatedat?: Date | string | null
    userid?: number | null
  }

  export type expensesUpdateWithoutCategoriesInput = {
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneWithoutExpensesNestedInput
  }

  export type expensesUncheckedUpdateWithoutCategoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userid?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type expensesUncheckedUpdateManyWithoutCategoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userid?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type categoriesCreateManyUsersInput = {
    id?: number
    name?: string | null
    budget?: Decimal | DecimalJsLike | number | string | null
    createdat?: Date | string | null
    updatedat?: Date | string | null
  }

  export type expensesCreateManyUsersInput = {
    id?: number
    amount?: Decimal | DecimalJsLike | number | string | null
    date?: Date | string | null
    description?: string | null
    type?: string | null
    receipt?: string | null
    createdat?: Date | string | null
    updatedat?: Date | string | null
    categoryid?: number | null
  }

  export type incomesCreateManyUsersInput = {
    id?: number
    amount: Decimal | DecimalJsLike | number | string
    date: Date | string
    source: string
    description?: string | null
    created_at?: Date | string | null
  }

  export type categoriesUpdateWithoutUsersInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    budget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expenses?: expensesUpdateManyWithoutCategoriesNestedInput
  }

  export type categoriesUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    budget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expenses?: expensesUncheckedUpdateManyWithoutCategoriesNestedInput
  }

  export type categoriesUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    budget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type expensesUpdateWithoutUsersInput = {
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categories?: categoriesUpdateOneWithoutExpensesNestedInput
  }

  export type expensesUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categoryid?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type expensesUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    receipt?: NullableStringFieldUpdateOperationsInput | string | null
    createdat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedat?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categoryid?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type incomesUpdateWithoutUsersInput = {
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type incomesUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type incomesUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}