import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { UpdatePremiumCollectionInput } from '../../routes/schema/premiumCollection';
import { addPremiumOrnaments, deletePremiumCollectionImages, getAllPremiumCollection, getPremiumCollectionCategory, getPremiumCollectionImages, updatePremiumCollection, uploadPremiumImage } from '../api/PremiumCollection/PrimiumCollectionList';

export interface PremiumCollection{
    ornament_id: string;
    ornament_name: string;
    ornament_category:string;
    ornament_description:string;
    category: string;
    width:string;
    height:string;
    carat:string;
    gold_weight:string;
    total_price:string;
    image_paths:string;
    other_stones:string;
    other_metals:string;
    other_charges:string;
    total_weight:string;
    stock_count:string;
}

export interface PremiumCategory{
  category:string;

}
export interface ImageID {
  image_id: string;
  image_path: ImagePath;
  mime_type: string;
}

export interface ImagePath{
  image_id: string;
  image_path: ImagePath;
  mime_type: string;
}

  export interface PremiumCollectionState {
    allPremiumCollectionList: PremiumCollection[];
    totalPremiumCollection: number;
    isPremiumCollectionLoading: boolean;
    premiumCollectionMessage: string;
    selectedPremiumImages: ImageID[];
    selectedPremiumCategory: PremiumCategory[];

  }

  const initialState: PremiumCollectionState = {
    allPremiumCollectionList: [],
    totalPremiumCollection: 0,
    isPremiumCollectionLoading: false,
    premiumCollectionMessage: '',
    selectedPremiumImages: [],
    selectedPremiumCategory: [],
  };


  export const getPremiumCollectionListAsync = createAsyncThunk(
    'premiumCollection/getAllPremiumCollection',
   
    async () => {
        const res: any = await getAllPremiumCollection();
        return res.data;
       
      },
  );

  export const updatePremiumCollectionsAsync = createAsyncThunk(
    'premium/updatePremiumCollection',
    async ({ornament_id, stock_count}:UpdatePremiumCollectionInput) => {
      const res: any = await updatePremiumCollection({ornament_id, stock_count});
      return res.data;
    },
  );

  export const uploadPremiumImageAsync = createAsyncThunk(
    'uploadPremiumImage/UploadPremiumImage',
   
    async (formData:FormData) => {
        const res: any = await uploadPremiumImage(formData);
        return res.data;
       
      },
  );

  export const addPremiumOrnamentsAsync = createAsyncThunk(
    'addPremiumOrnaments/AddPremiumOrnaments',
   
    async (formData:FormData) => {
        const res: any = await addPremiumOrnaments(formData);
        return res.data;
      
      },
  );

  export const getPremiumCollectionImagesAsync = createAsyncThunk(
    "premium/viewPremiumImage",
    async (ornament_id: string) => {
      const res: any = await getPremiumCollectionImages(ornament_id);
      return res.data;
    }
  );

  export const deletePremiumCollectionImagesAsync = createAsyncThunk(
    "premium/deletePremiumImage",
    async (image_id: string) => {
      const res: any = await deletePremiumCollectionImages(image_id);
      return res.data;
    }
  );

  export const getAllPremiumCollectionCategoryAsync = createAsyncThunk(
    "premium/getAllCategroy",
    async () => {
      const res: any = await getPremiumCollectionCategory();
    return res.data;
  }
  );




  const premiumCollectionSlice = createSlice({
    name: 'premiumCollection',
    initialState,
    reducers: {
      clearPremiumCollectionMessage: state => {
        state.premiumCollectionMessage = '';
      },
      
    },

    extraReducers: builder => {
        builder
          .addCase(getPremiumCollectionListAsync.pending, state => {
            state.isPremiumCollectionLoading = true;
          })
          .addCase(getPremiumCollectionListAsync.fulfilled, (state, action) => {
            state.allPremiumCollectionList = action.payload.data;
            state.isPremiumCollectionLoading = false;
          })
          .addCase(getPremiumCollectionListAsync.rejected, state => {
            state.isPremiumCollectionLoading = false;
          })

          .addCase(updatePremiumCollectionsAsync.fulfilled, (state, action) => {
            state.allPremiumCollectionList = state.allPremiumCollectionList.map(premiumCollection =>
                premiumCollection.ornament_id === action.payload.data.ornament_id
                ? action.payload.data
                : premiumCollection,
            );
            state.premiumCollectionMessage = action.payload.message;
            state.isPremiumCollectionLoading = false;
          })
          .addCase(updatePremiumCollectionsAsync.pending, state => {
            state.isPremiumCollectionLoading = true;
          })
          .addCase(updatePremiumCollectionsAsync.rejected, (state, action) => {
            state.isPremiumCollectionLoading = false;
            state.premiumCollectionMessage = action.error.message
              ? action.error.message
              : 'Something went wrong';
          })

          .addCase(uploadPremiumImageAsync.fulfilled, (state, action) => {
            state.allPremiumCollectionList = state.allPremiumCollectionList.map(premiumCollection =>
                premiumCollection.ornament_id === action.payload.data.ornament_id
                ? action.payload.data
                : premiumCollection,
            );
            state.premiumCollectionMessage = action.payload.message;
            state.isPremiumCollectionLoading = false;
          })
          .addCase(uploadPremiumImageAsync.pending, state => {
            state.isPremiumCollectionLoading = true;
          })
          .addCase(uploadPremiumImageAsync.rejected, (state, action) => {
            state.isPremiumCollectionLoading = false;
            state.premiumCollectionMessage = action.error.message
              ? action.error.message
              : 'Something went wrong';
          })

          .addCase(addPremiumOrnamentsAsync.fulfilled, (state, action) => {
            state.allPremiumCollectionList = state.allPremiumCollectionList.map(premiumCollection =>
                premiumCollection.ornament_id === action.payload.data.ornament_id
                ? action.payload.data
                : premiumCollection,
            );
            state.premiumCollectionMessage = action.payload.message;
            state.isPremiumCollectionLoading = false;
          })
          .addCase(addPremiumOrnamentsAsync.pending, state => {
            state.isPremiumCollectionLoading = true;
          })
          .addCase(addPremiumOrnamentsAsync.rejected, (state, action) => {
            state.isPremiumCollectionLoading = false;
            state.premiumCollectionMessage = action.error.message
              ? action.error.message
              : 'Something went wrong';
          })

          .addCase(getPremiumCollectionImagesAsync.pending, (state) => {
            state.isPremiumCollectionLoading = true;
          })
          .addCase(getPremiumCollectionImagesAsync.fulfilled, (state, action) => {
            state.isPremiumCollectionLoading = false;
            state.selectedPremiumImages = action.payload.data.image_paths;
          })
          .addCase(getPremiumCollectionImagesAsync.rejected, (state) => {
            state.isPremiumCollectionLoading = false;
          })
          
          .addCase(deletePremiumCollectionImagesAsync.fulfilled, (state, action) => {
            state.selectedPremiumImages = state.selectedPremiumImages.filter(
              image_id => image_id !== action.payload.data,
            );
    
            state.premiumCollectionMessage = action.payload.message;
            state.isPremiumCollectionLoading = false;
          })

          
          .addCase(deletePremiumCollectionImagesAsync.pending, state => {
            state.isPremiumCollectionLoading = true;
          })
          .addCase(deletePremiumCollectionImagesAsync.rejected, (state, action) => {
            state.isPremiumCollectionLoading = false;
            state.premiumCollectionMessage = action.error.message
              ? action.error.message
              : 'Something went wrong';
          })


          .addCase(getAllPremiumCollectionCategoryAsync.pending, state => {
            state.isPremiumCollectionLoading = true;
          })
          .addCase(getAllPremiumCollectionCategoryAsync.fulfilled, (state, action) => {
            state.selectedPremiumCategory = action.payload.data;
            state.isPremiumCollectionLoading = false;
          })
          .addCase(getAllPremiumCollectionCategoryAsync.rejected, state => {
            state.isPremiumCollectionLoading = false;
          })


        
      },
    });

    export const selectAllPremiumCollectionList = (state: RootState) =>
    state.premiumCollection.allPremiumCollectionList;
  export const selectPremiumCollectionMessage = (state: RootState) =>
    state.premiumCollection.premiumCollectionMessage;
  export const selectPremiumCollectionLoading = (state: RootState) =>
    state.premiumCollection.isPremiumCollectionLoading;
  export const selectTotalPremiumCollection = (state: RootState) =>
  state.premiumCollection.totalPremiumCollection;
  export const selectSelectedPremiumCollectionImages = (state: RootState) => 
  state.premiumCollection.selectedPremiumImages
  export const selectSelectedPremiumCollectionCategory = (state: RootState) => 
  state.premiumCollection.selectedPremiumCategory


  
  export const { clearPremiumCollectionMessage } = premiumCollectionSlice.actions;
  export default premiumCollectionSlice.reducer;