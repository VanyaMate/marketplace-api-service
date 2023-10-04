export type Category = {
    title: string,
    description: string,
    image: string,
    parent: Category | string,
    subcategory: (Category | string)[],
};

export type CreateCategoryDto =
    Partial<Omit<Category, 'title'>>
    & Pick<Category, 'title'>;

export type UpdateCategoryDto = {
    old: CreateCategoryDto,
    new: Partial<Category>
};