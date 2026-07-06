import type { Types } from "mongoose";

export interface PropQueryList {
    limit: any;
    page: any;
    status?: 'ACTIVE' | 'INACTIVE' | undefined;
    search?: string | undefined;
    items?: Types.ObjectId[]
}
