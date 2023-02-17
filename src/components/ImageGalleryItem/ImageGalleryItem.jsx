import { useState } from 'react';
import PropTypes from 'prop-types';
import { Item } from './ImageGalleryItem.styled';
import { ImageItem } from './ImageGalleryItem.styled';
import Modal from 'components/Modal/Modal';

export default function ImageGalleryItem({ id, imageSmall, imageLarge, tag }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <Item key={id}>
      {showModal && <Modal onClick={toggleModal}>{imageLarge}</Modal>}
      <ImageItem onClick={toggleModal} src={imageSmall} alt={tag} />
    </Item>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  imageSmall: PropTypes.string.isRequired,
  imageLarge: PropTypes.string.isRequired,
  tag: PropTypes.string,
};
