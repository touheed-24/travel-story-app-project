import React, { useState } from 'react'
import { MdAdd, MdDeleteOutline, MdUpdate, MdClose } from 'react-icons/md'
import DateSelector from '../../components/Input/DateSelector';
import ImageSelector from '../../components/Input/ImageSelector';
import TagInput from '../../components/Input/TagInput';
import moment from 'moment';
import uploadImage from '../../utils/uploadImage';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInstance';

const AddEditTravelStory = ({
    storyInfo,
    type,
    onClose,
    getAllTravelStories,
}) => {

    const [title, setTitle] = useState(storyInfo?.title || "");
    const [storyImg, setStoryImg] = useState(storyInfo?.imageUrl || null);
    const [story, setStory] = useState(storyInfo?.story || "");
    const [visitedLocation, setVisitedLocation] = useState(storyInfo?.visitedLocation || []);
    const [visitedDate, setVisitedDate] = useState(storyInfo?.visitedDate || null);

    const [error, setError ] = useState("");


    // Add New Travel Story
    const addNewTravelStory = async () => {
        try{
            let imageUrl = "";

            //Upload image if present
            if(storyImg) {
                const imgUploadRes = await uploadImage(storyImg);
                // Get Image URL
                imageUrl = imgUploadRes.imageUrl || "";
            }

            const response = await axiosInstance.post("/add-travel-story", {
                title,
                story,
                imageUrl: imageUrl || "",
                visitedLocation,
                visitedDate: visitedDate
                    ? moment(visitedDate).valueOf()
                    : moment().valueOf(),
            });

            if(response.data && response.data.story){
                toast.success("Story Added Successfully");
                //Refresh Stories
                getAllTravelStories();
                //Close modal or form
                onClose();
            }
        } catch (error) {
            if(
                error.response &&
                error.response.data &&
                error.response.data.message
            ){
                setError(error.response.data.message);
            }else{
                //Handle Unexpected error
                setError("An unexpected error occured. Please try again");
            }
        }
    }

    // Update Travel Story
    const updateTravelStory = async () => {
        const storyId = storyInfo._id;
        try{
            let imageUrl = storyInfo.imageUrl ||"";

            if(typeof storyImg === "object"){
                //Upload New Image
                const imgUploadRes = await uploadImage(storyImg);
                imageUrl = imgUploadRes.imageUrl || "";
            }

            let postData = {
                title,
                story,
                imageUrl,
                visitedLocation,
                visitedDate: visitedDate
                    ? moment(visitedDate).valueOf()
                    : moment().valueOf(),
            }


            postData = {
                ...postData,
                imageUrl: imageUrl,
            };


            const response = await axiosInstance.put("/edit-story/" + storyId, postData);

            if(response.data && response.data.story){
                toast.success("Story Updated Successfully");
                //Refresh Stories
                getAllTravelStories();
                //Close modal or form
                onClose();
            }
        } catch (error) {
            if(
                error.response &&
                error.response.data &&
                error.response.data.message
            ){
                setError(error.response.data.message);
            }else{
                //Handle Unexpected error
                setError("An unexpected error occured. Please try again");
            }
        }
    }

    const handleAddorUpdateClick = () => {
        console.log("Input Data:", {title, storyImg, story, visitedLocation, visitedDate})

        if(!title){
            setError("Please enter the title");
            return
        }

        if(!story){
            setError("Please enter the story");
            return
        }

        setError();

        if(type === 'edit'){
            updateTravelStory();
        }else{
            addNewTravelStory();
        }
    };

    //Delete story image and Update the story
    const handleDeleteStoryImg = async () => {
        // Deleting the Image
        const deleteImgRes = await axiosInstance.delete("/delete-image", {
            params: {
                imageUrl: storyInfo.imageUrl,
            },
        });
        
        if (deleteImgRes.data) {
            const storyId = storyInfo._id;
        
            const postData = {
                title,
                story,
                visitedLocation,
                visitedDate: moment().valueOf(),
                imageUrl: "",
            };
        
            // Updating story
            const response = await axiosInstance.put("/edit-story/" + storyId, postData);
            setStoryImg(null);
        }
    };
        
    

  return (
    <div className='relative'>
        <div className='flex items-center justify-between'>
            <h5 className='text-xl font-medium text-slate-700'>
                {type === "add" ? "Add Story" : "Update Story"}
            </h5>

            <div>
                <div className='flex items-center gap-3 by-primary-50/50 p-2 rounded-l-lg'>
                    { type === 'add' ? (<button className='btn-small' onClick={handleAddorUpdateClick}>
                        <MdAdd className='text-lg' /> ADD STORY
                    </button> 
                    )   :   (
                        <>
                            <button className='btn-small' onClick={handleAddorUpdateClick}>
                                <MdUpdate className='text-lg' /> UPDATE STORY
                            </button>

                            {/* <button className='btn-small btn-delete' onClick={onClose}>
                            <MdDeleteOutline className='text-lg' /> DELETE
                            </button> */}
                        </>
                    )}

                    <button className='' onClick={onClose}>
                        <MdClose className='text-xl text-slate-400' />
                    </button>
                </div>

                {error && (
                    <p className='text-red-500 text-xs pt-2 text-right'>{error}</p>
                )}
            </div>
        </div>

        <div>
            <div className='felx-1 flex flex-col gap-2 pt-4'>
                <label className="input-label">TITLE</label>
                <input type="text" className='text-2xl text-slate-950 outline-none' placeholder='A Day In A Pleasant World' 
                value={title}
                onChange={({ target }) => setTitle(target.value)}
                />
            
                <div className='my-3'>
                <DateSelector date={visitedDate} setDate={setVisitedDate} />
                </div>

                <ImageSelector image={storyImg} setImage={setStoryImg} handleDeleteImg={handleDeleteStoryImg} />

                <div className='flex flex-col gap-2 mt-4'>
                    <label className="input-label">STOTY</label>
                    <textarea type="text" className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded" placeholder='Your Story' rows={10} value={story}
                    onChange={({ target }) => setStory(target.value)}
                    />
                </div>

                <div className='pt-3'>
                    <label className="input-label">VISITED LOCATIONS</label>
                    <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddEditTravelStory