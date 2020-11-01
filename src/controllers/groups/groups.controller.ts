import express, { Request, Response } from 'express';
import { groupsService } from '@services';
import { groupByIdValidator, groupPostValidator, groupPutByIdValidator } from './groups.validators';
import { ValidatedRequest } from 'express-joi-validation';
import { GroupByIdSchema, GroupPostSchema, GroupPutByIdSchema } from './groups.types';
import { getErrorResponseHandler } from '@helpers/errors';

export const getGroupsMiddleware = (_: Request, res: Response): void => {
    groupsService
        .getAllGroups()
        .then((data: GroupDTO[]) => res.json(data))
        .catch(getErrorResponseHandler(res));
};

export const getGroupByIdMiddleware = ({ params: { id } }: ValidatedRequest<GroupByIdSchema>, res: Response): void => {
    groupsService
        .getGroup(id)
        .then((data: GroupDTO) => res.json(data))
        .catch(getErrorResponseHandler(res));
};

export const createGroupMiddleware = ({ body }: ValidatedRequest<GroupPostSchema>, res: Response): void => {
    groupsService
        .createGroup(body)
        .then((data: GroupDTO) => res.json(data))
        .catch(getErrorResponseHandler(res));
};

export const updateGroupMiddleware = (
    { params: { id }, body }: ValidatedRequest<GroupPutByIdSchema>,
    res: Response
): void => {
    groupsService
        .updateGroup({ id, ...body })
        .then((data: GroupDTO[]) => res.json(data))
        .catch(getErrorResponseHandler(res));
};

export const deleteGroupMiddleware = ({ params: { id } }: ValidatedRequest<GroupByIdSchema>, res: Response): void => {
    groupsService
        .deleteGroup(id)
        .then((data: number) => res.json(data))
        .catch(getErrorResponseHandler(res));
};

const groupsController = express.Router();

groupsController.route('/groups').get(getGroupsMiddleware).post(groupPostValidator, createGroupMiddleware);

groupsController
    .route('/groups/:id')
    .all(groupByIdValidator)
    .get(getGroupByIdMiddleware)
    .put(groupPutByIdValidator, updateGroupMiddleware)
    .delete(deleteGroupMiddleware);

export { groupsController };
