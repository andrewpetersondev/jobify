import express from 'express'
const router = express.Router()

import { createJob, deleteJob, getAllJobs, updateJob, showStats } from '../controllers/jobsController.js'

router.route('/').post(createJob).get(getAllJobs)

// VERY IMPORTANT THAT /STATS IS ABOVE THE /:ID
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)


export default router