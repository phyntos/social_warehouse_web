import { ConfigProvider, Steps } from 'antd';
import React from 'react';
import './ProWorkflow.scss';

export type WorkflowVM<StatusCodes> = {
    active: boolean;
    done: boolean;
    order: number;
    slaMinutes: number;
    statusCode: StatusCodes;
    statusName: string;
};

const ProWorkflow = <StatusCodes extends string>({
    workflows,
    rejectedStatusCodes,
}: {
    workflows: WorkflowVM<StatusCodes>[] | undefined;
    rejectedStatusCodes?: StatusCodes[];
}) => {
    return (
        <ConfigProvider prefixCls='pro-workflow'>
            <div className='pro-workflow'>
                <Steps
                    size='small'
                    current={workflows?.findIndex((workflow) => workflow.active)}
                    items={workflows?.map((workflow) => ({
                        title: workflow.statusName,
                        status: rejectedStatusCodes?.includes(workflow.statusCode)
                            ? 'error'
                            : workflow.done
                            ? 'finish'
                            : undefined,
                    }))}
                />
            </div>
        </ConfigProvider>
    );
};

export default ProWorkflow;
