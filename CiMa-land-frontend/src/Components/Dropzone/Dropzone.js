import { DropzoneArea } from 'material-ui-dropzone';
import { useStyles } from './Dropzone.style';

export default function Dropzone({setImages}) {
const classes = useStyles();
const handleFileSelect = files => {
    setImages(files);
    console.log("files: ",files);
}

    return(
        <DropzoneArea
            showPreviews={true}
            showPreviewsInDropzone={false}
            useChipsForPreview
            previewGridProps={{container: { spacing: 1, direction: 'row' }}}
            previewChipProps={{classes: { root: classes.previewChip } }}
            previewText="Selected files"
            onChange={handleFileSelect}
        />
    );
}