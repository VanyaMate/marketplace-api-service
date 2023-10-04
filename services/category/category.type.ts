export type Category = {
    title: string,
    description: string,
    image: string,
    parent: string,
    subcategories: string[],
};

export type CreateCategoryDto =
    Partial<Omit<Category, 'title'>>
    & Pick<Category, 'title'>;

export type UpdateCategoryDto = Partial<Category>;