import { Note } from '../models/note';
import { ApiResult } from '../models/api-result';

export class DtoMapper {
    // ----- send data to server
    public static toDtoNote(note: Note): object {
        return {
            Data: note.data,
            Uid: note.uid
        };
    }

    // ----- get data from server
    public static fromDtoNote(dtoNote: any): Note {
        if (dtoNote) {
            const note = new Note(dtoNote.Data, dtoNote.Uid, dtoNote.CreatedBy, dtoNote.CreatedAt, dtoNote.HasUpdated, dtoNote.LastUpdatedAt, dtoNote.LastUpdatedBy);
            return note;
        }

        return dtoNote;
    }

    // ----- entry methods
    public static mapResultDataArray<T>(apiResult: ApiResult<any>, mapper: (data: any) => T): ApiResult<T[]> {
        const mappedResult = new ApiResult<T[]>();
        mappedResult.success = apiResult.success;
        mappedResult.message = apiResult.message;

        if (apiResult.data && Array.isArray(apiResult.data)) {
            mappedResult.data = apiResult.data.map(mapper);
        }

        return mappedResult;
    }

    public static mapResultData<T>(apiResult: ApiResult<any>, mapper: (data: any) => T): ApiResult<T> {
        const mappedResult = new ApiResult<T>();
        mappedResult.success = apiResult.success;
        mappedResult.message = apiResult.message;
        mappedResult.data = mapper(apiResult.data);

        return mappedResult;
    }
}
