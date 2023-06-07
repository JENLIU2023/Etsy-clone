const GET_PRODUCTS = "products/GET_PRODUCTS"
const CREATE_PRODUCT = "products/CREATE_PRODUCT"
const EDIT_PRODUCT = "products/EDIT_PRODUCT"
const DELETE_PRODUCT = "products/DELETE_PRODUCT"
const CREATE_REVIEW = "products/CREATE_REVIEW"
const DELETE_REVIEW ="products/DELETE_REVIEW"

//action creator
const getProducts = (products) => ({
    type: GET_PRODUCTS,
    products
})
const createProduct = (newProduct) => ({
    type: CREATE_PRODUCT,
    newProduct
})
const editProduct = (editProduct) => ({
    type: EDIT_PRODUCT,
    editProduct
})
const deleteProduct = (deleteProductId) => ({
    type: DELETE_PRODUCT,
    deleteProductId
})
const createReview = (newReview) => ({
    type: CREATE_REVIEW,
    newReview
})
const deleteReivew = (review) => ({
    type: DELETE_REVIEW,
    review
})


//Thunk Action Creators
export const fetchProducts = () => async (dispatch) => {
    const res = await fetch("/api/products")
    
    if (res.ok) {
        const {products} = await res.json();
        console.log(products);
        dispatch(getProducts(products));
    }
}
export const thunkNewProduct = (product,images) => async (dispatch) => {
    console.log("testthunk")
    const response = await fetch('/api/products/new',{
        method:'POST',
        headers:{ "Content-Type" : 'application/json' },
        body: JSON.stringify(product)
    })

    let newProduct 
    if(response.ok) {
        newProduct = response.json();
        await dispatch(createProduct(newProduct))
    } 
    
    return newProduct;  
};

export const thunkEditProduct = (product) => async (dispatch) => {
    console.log("product in thunk", product)
    const response = await fetch(`/api/products/${product.id}`,{
        method:'PUT',
        headers:{ "Content-Type" : 'application/json' },
        body: JSON.stringify(product)
    })

    if(response.ok) {
        const Product_edit = await response.json();
        dispatch(editProduct(Product_edit))
        return Product_edit;  
    };
}

export const thunkDeleteProduct = (productId) => async (dispatch) => {
    console.log("inside the delete thunk",productId)
    const response = await fetch(`/api/products/${productId}`,{
    method:'DELETE'
    })
    if(response.ok) {
      const Producttodelete = await response.json();
      dispatch(deleteProduct(Producttodelete.id))
      return Producttodelete
    }
  }

  //Reviews Thunk
export const thunkNewReview = (review,productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}/reviews`,{
        method:'POST',
        headers:{ "Content-Type" : 'application/json' },
        body: JSON.stringify(review)
    })

    let newReviewObj
    if(response.ok) {
        newReviewObj = await response.json();
        await dispatch(createReview(newReviewObj.review))
    } 
    return review;  
};

export const thunkDeleteReview = (productId, reviewId) => async (dispatch) => {
    // console.log("inside the delete thunk",productId)
    console.log("reviewId in thunk:", reviewId)
    console.log("productId in thunk:", productId)
    const response = await fetch(`/api/products/${productId}/reviews/${reviewId}`,{
    method:'DELETE'
    })
    if(response.ok) {
      const ReviewtodeleteObj = await response.json();
      dispatch(deleteReivew(ReviewtodeleteObj.review))
      return ReviewtodeleteObj
    }
  }




const initialState = {}

const productsReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case GET_PRODUCTS:
            action.products.forEach(product => {
                newState[product.id] = product
            })
            return newState
        case CREATE_PRODUCT:
            console.log("test")
            newState = { ...state}
            newState[action.newProduct.id] = action.newProduct
            return newState
        case EDIT_PRODUCT:
            newState = { ...state}
            newState[action.editProduct.id] = action.editProduct
            return newState
        case DELETE_PRODUCT:
            newState = { ...state}
            delete newState[action.deleteProductId] 
            return newState
        case CREATE_REVIEW:
            newState = { ...state }
            console.log(newState);
            newState[action.newReview.productId].reviews.push(action.newReview)
            return newState
        case DELETE_REVIEW:
            newState = { ...state}
            delete newState[action.review.productId].reviews[action.review.id]
            return newState
        default:
            return state;
    }
}

export default productsReducer
