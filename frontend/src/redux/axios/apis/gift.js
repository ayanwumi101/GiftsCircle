import api from '../axios';

const GetGiftItemsApi = () => {
  return api.get('/giftItem/Get/All');
};

const GetComplimentaryGiftItemsApi = () => {
  return api.get('/complimentaryGift/Get/All');
};

const GetUserPurchasedGiftsApi = id => {
  return api.get(`/gift/Get/PurchasedBy/${id}`);
};

const GetEventGiftTransApi = (id) => {
  return api.get(`/gift/Get/EventGifts/${id}`);
};

const GetUserEventGiftTransApi = (id, userId) => {
  return api.get(`/gift/Get/EventGifts/${id}/${userId}/`);
};

const CreateManyGiftsApi = data => {
  return api.post('/gift/createMany', data);
};

const BuyGiftsApi = data => {
  return api.post('/gift/Buy', data);
};

const BuyComplimentaryGiftsApi = data => {
  return api.post('/complimentaryGift/Buy', data);
};

const DeleteEventGiftApi = id => {
  return api.delete(`/gift/${id}`);
};

const AddGiftApi = data => {
  return api.post('/gift/BuyMarketGift', data);
};

const GetUserGiftApi = id => {
  return api.get(`/gift/Get/MarketUserGifts/${id}`);
};

const GetUserEventGiftsApi = (id, userId) => {
  return api.get(`/gift/Get/EventGifts/${id}/${userId}`);
}

export {
  GetGiftItemsApi,
  GetComplimentaryGiftItemsApi,
  GetEventGiftTransApi,
  GetUserEventGiftTransApi,
  CreateManyGiftsApi,
  BuyGiftsApi,
  BuyComplimentaryGiftsApi,
  DeleteEventGiftApi,
  GetUserPurchasedGiftsApi,
  AddGiftApi,
  GetUserGiftApi,
  GetUserEventGiftsApi
};
