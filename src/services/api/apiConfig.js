
// users urls
export const Users_URLS={
    LOGIN:`/Users/Login`,
    REGISTER:`/Users/Register`,
    DELETE_USER:(id)=>`/Users/${id}`,
    GET_USER:(id)=>`/Users/${id}`,
    VERIFY_USER:`/Users/verify`,
    GET_USERS:`/Users/`,
    GET_CURRENT_USER:'/Users/currentUser',
    UPDATE_CURRENT_PROFILE:'/Users',
    CHANGE_PASSWORD:`/Users/ChangePassword`,
    FORGET_PASSWORD:`/Users/Reset/Request`,
    RESET_PASSWORD:`/Users/Reset`,
    }
    
    // recipes utls
    export const Recipes_URLS={
    CREATE_RECIPE:`/Recipe`,
    GET_RECIPIES:`/Recipe`,
    GET_RECIPE:(id)=>`/Recipe/${id}`,
    DELETE_RECIPE:(id)=>`/Recipe/${id}`,
    UPDATE_RECIPE:(id)=>`/Recipe/${id}`
    }
    // categories urls
    export const Categories_URLS={
    CREATE_CATEGORY:`/Category`,
    GET_CATEGORIES:`/Category`,
    GET_CATEGORY:(id)=>`/Category/${id}`,
    DELETE_CATEGORY:(id)=>`/Category/${id}`,
    UPDATE_CATEGORY:(id)=>`/Category/${id}`
    }
    // user_recipe urls
    export const UserRecipes_URLS={
        GET_USER_RECIPES:`/userRecipe`,
        POST_USER_RECIPES:`/userRecipe`,
        DETELTE_USER_RECIPE:(id)=>`/userRecipe/${id}`
    }
// tag url 
export const Tag_URl={
    GET_TAGS:`/tag`
}