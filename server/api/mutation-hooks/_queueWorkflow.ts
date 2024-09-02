import scheduleUows from "./_scheduleUows.js";

const queueWorkflow = async (context: any, projectType: string, workflowInputData: any) => {
  try {
    const workflow = (await context.pgClient.query(`
      select prj_fn.do_queue_workflow(
        $1
        ,$2
        ,$3
      );
    `,[
      projectType
      ,context.user.appTenantId
      ,{
        workflowInputData: workflowInputData
      }
    ]
    )).rows[0].do_queue_workflow

    const uowsToSchedule = workflow.uows_to_schedule
    await scheduleUows(uowsToSchedule)

  } catch (error) {
    throw error
  } finally {
  }
}

export default queueWorkflow