import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { thunkDeleteReview } from "../../store/products"
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import './DeleteReview.css'

const DeleteReview = ({productId, reviewId}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const {closeModal} =  useModal();
    // const deleteproduct = useSelector(state => state?.products[productId])
    // console.log("component", deleteproduct)
  //   const { reviewId } = useParams()
  console.log("reviewId:", reviewId)
  console.log("productId:", productId)

    const handleSubmityes = async (e) => {
        const deletedReview= await dispatch(thunkDeleteReview(productId, reviewId))
          e.preventDefault();
          await closeModal()
          if(deletedReview){
            history.push('/shop')
          }
        };
        const handleSubmitno = async (e) => {
          e.preventDefault()
        closeModal()
        }
        
        
        return(
            
                <div>
                <h1>Confirm Delete</h1>
                <p>Are you sure you want to remove this review?</p>
                <form>
                <div className="delete-buttons">
                  <button  onClick={handleSubmityes}>Yes </button>
                  <button  onClick={handleSubmitno}> No </button>
                  </div>
                </form>
                </div>
                
            )


}

export default DeleteReview