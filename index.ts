import { SingleService, SingleServiceOptions } from './services/single.service';
import { MultiplyService } from './services/multiply.service';
import {
    MultiplyResponse,
    PK,
    SearchOptions,
    SortOption,
    IntersectionPropertiesOf2,
    IntersectionPropertiesOf3,
} from './services/common.type';
import { IDataGenerator } from './services/data-generator.type';
import { StorageService } from './services/storage/storage.service';
import { UserLocalService } from './services/user/user-local.service';
import { IUserService, IUserMapper } from './services/user/user.interface';
import {
    Product,
    ProductCreateDto,
    ProductUpdateDto,
} from './services/product/product.type';
import {
    PublicUser,
    UpdateUserDto,
    User,
    CreateUserDto,
} from './services/user/user.type';
import {
    Category,
    CreateCategoryDto,
    UpdateCategoryDto,
} from './services/category/category.type';
import { ICategoryService } from './services/category/category.interface';
import { ICategoriesService } from './services/categories/categories.interface';
import { ProductLocalService } from './services/product/product-local.service';
import {
    ProductDataGenerator,
} from './services/product/product.data-generator';
import {
    ProductsLocalService,
} from './services/products/products-local.service';
import { IProductsService } from './services/products/products.interface';
import { IProductService } from './services/product/product.interface';
import { IMultiplyService } from './services/service.interface';
import { UserDataGenerator } from './services/user/user.data-generator';
import { UserMapper } from './services/user/user.mapper';
import { StorageName } from './config/storage-names.config';
import { IStorageService } from './services/storage/storage.interface';
import { IService } from './services/service.interface';
import { IAuthService } from './services/auth/auth.interface';
import { NO_VALID_DATA, NOT_FOUND } from './config/errors.config';
import {
    CategoryDataGenerator,
} from './services/category/category.data-generator';
import {
    CategoriesService,
} from './services/categories/categories-local.service';
import {
    CategoryLocalService,
} from './services/category/category-local.service';
import { AuthLocalService } from './services/auth/auth-local.service';


export {
    IAuthService,
    IService,
    IStorageService,
    IMultiplyService,
    IProductService,
    IProductsService,
    UserDataGenerator,
    UserMapper,
    StorageName,
    Product,
    ProductCreateDto,
    ProductUpdateDto,
    ProductDataGenerator,
    ProductsLocalService,
    ProductLocalService,
    PK,
    PublicUser,
    User,
    CreateUserDto,
    SearchOptions,
    SortOption,
    UpdateUserDto,
    ICategoryService,
    UpdateCategoryDto,
    CreateCategoryDto,
    IDataGenerator,
    ICategoriesService,
    IUserMapper,
    Category,
    StorageService,
    UserLocalService,
    NOT_FOUND,
    NO_VALID_DATA,
    IUserService,
    MultiplyResponse,
    MultiplyService,
    SingleServiceOptions,
    SingleService,
    IntersectionPropertiesOf2,
    IntersectionPropertiesOf3,
    CategoriesService,
    CategoryLocalService,
    CategoryDataGenerator,
    AuthLocalService,
};